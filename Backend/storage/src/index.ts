/**
 * AWS S3 Migration of Cloudflare Worker
 *
 * - This code maintains the same API endpoints as the original
 * - Uses AWS SDK v3 for S3 operations
 * - Handles all the same operations: list, get, put, delete, etc.
 */
import { z } from 'zod';
import { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand, DeleteObjectCommand, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import startercode from './startercode';
import { Readable } from 'stream';

// Helper function to convert streams to text
async function streamToString(stream: Readable): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });
}

export interface Env {
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_REGION: string;
  S3_BUCKET_NAME: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const success = new Response('Success', { status: 200 });
    const notFound = new Response('Not Found', { status: 404 });
    const methodNotAllowed = new Response('Method Not Allowed', { status: 405 });
    const invalidRequest = new Response('Invalid Request', { status: 400 });
    const serverError = new Response('Server Error', { status: 500 });
    if (!env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY || !env.AWS_REGION || !env.S3_BUCKET_NAME) {
        console.error('AWS credentials or bucket name not configured properly');
        return new Response('AWS configuration missing. Please set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and S3_BUCKET_NAME environment variables.', { 
          status: 500 
        });
      }
  
    // Initialize the S3 client
    const s3Client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // DELETE /api/project - Delete all files for a project
    if (path === '/api/project' && method === 'DELETE') {
      try {
        const deleteSchema = z.object({
          virtualboxId: z.string(),
        });

        const body = await request.json();
        const { virtualboxId } = deleteSchema.parse(body);
        console.log("virtualbox",virtualboxId)
        // List all objects with the prefix
        const listCommand = new ListObjectsV2Command({
          Bucket: env.S3_BUCKET_NAME,
          Prefix: `projects/${virtualboxId}`,
        });

        const listResult = await s3Client.send(listCommand);
        
        if (listResult.Contents && listResult.Contents.length > 0) {
          // AWS S3 DeleteObjects can delete up to 1000 objects in a single call
          const deleteObjects = listResult.Contents.map(file => ({
            Key: file.Key as string
          }));

          const deleteCommand = new DeleteObjectsCommand({
            Bucket: env.S3_BUCKET_NAME,
            Delete: { Objects: deleteObjects }
          });

          await s3Client.send(deleteCommand);
        }

        return success;
      } catch (error) {
        console.error('Error in project deletion:', error);
        return new Response('Error deleting project', { status: 500 });
      }
    } 
    // GET /api/size - Get the total size of a project
    else if (path === '/api/size' && method === 'GET') {
      try {
        const params = url.searchParams;
        const virtualboxId = params.get('virtualboxId');

        if (virtualboxId) {
          const listCommand = new ListObjectsV2Command({
            Bucket: env.S3_BUCKET_NAME,
            Prefix: `projects/${virtualboxId}`
          });

          const listResult = await s3Client.send(listCommand);
          
          let size = 0;
          if (listResult.Contents) {
            for (const file of listResult.Contents) {
              size += file.Size || 0;
            }
          }

          return new Response(JSON.stringify({ size }), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          return invalidRequest;
        }
      } catch (error) {
        console.error('Error getting size:', error);
        return new Response('Error getting size', { status: 500 });
      }
    } 
    // General API endpoints
    else if (path === '/api') {
      // GET /api - List files or get file content
      if (method === 'GET') {
        try {
          const params = url.searchParams;
          const virtualboxId = params.get('virtualboxId');
        
          // Validate virtualboxId
          if (!virtualboxId) {
            return new Response('Missing virtualboxId parameter', { status: 400 });
          }
      
          // Ensure proper prefix formatting
          const prefix = `projects/${virtualboxId}/`;
          console.log('Searching with prefix:', prefix);
      
          const listCommand = new ListObjectsV2Command({
            Bucket: env.S3_BUCKET_NAME,
            Prefix: prefix,
            Delimiter: '/' // This helps distinguish between files and folders
          });
      
          const listResult = await s3Client.send(listCommand);
          
          // Debug logging
          console.log('Raw S3 List Result:', JSON.stringify(listResult, null, 2));
      
          // Improved formatting with folder/file distinction
          const formattedResult = {
            folders: listResult.CommonPrefixes?.map(prefix => prefix.Prefix) || [],
            objects: listResult.Contents?.filter(item => 
              item.Key !== prefix // Exclude the base prefix itself
            ).map(item => ({
              key: item.Key?.replace(prefix, ''), // Remove prefix from key
              size: item.Size,
              etag: item.ETag?.replace(/"/g, ''),
              uploaded: item.LastModified
            })) || [],
            truncated: listResult.IsTruncated || false
          };
      
          console.log('Formatted Result:', JSON.stringify(formattedResult, null, 2));
      
          return new Response(JSON.stringify(formattedResult), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          console.error('Detailed Error in GET /api:', error);
          return new Response(`Error processing request: ${error}`, { status: 500 });
        }
      }
      // POST /api - Create an empty file
      else if (method === 'POST') {
        try {
          const createSchema = z.object({
            fileId: z.string(),
          });

          const body = await request.json();
          const { fileId } = createSchema.parse(body);

          const putCommand = new PutObjectCommand({
            Bucket: env.S3_BUCKET_NAME,
            Key: fileId,
            Body: ''
          });

          await s3Client.send(putCommand);

          return success;
        } catch (error) {
          console.error('Error in POST /api:', error);
          return new Response('Error creating file', { status: 500 });
        }
      } 
      // DELETE /api - Delete a file
      else if (method === 'DELETE') {
        try {
          const deleteSchema = z.object({ fileId: z.string() });

          const body = await request.json();
          const { fileId } = deleteSchema.parse(body);

          const deleteCommand = new DeleteObjectCommand({
            Bucket: env.S3_BUCKET_NAME,
            Key: fileId
          });

          await s3Client.send(deleteCommand);

          return success;
        } catch (error) {
          console.error('Error in DELETE /api:', error);
          return new Response('Error deleting file', { status: 500 });
        }
      } else {
        return methodNotAllowed;
      }
    } 
    // POST /api/rename - Rename (copy and delete) a file
    else if (path === '/api/rename' && method === 'POST') {
      try {
        const renameSchema = z.object({
          fileId: z.string(),
          newFileId: z.string(),
          data: z.string(),
        });

        const body = await request.json();
        const { fileId, newFileId, data } = renameSchema.parse(body);

        // Delete the old file
        const deleteCommand = new DeleteObjectCommand({
          Bucket: env.S3_BUCKET_NAME,
          Key: fileId
        });

        // Create new file with the data
        const putCommand = new PutObjectCommand({
          Bucket: env.S3_BUCKET_NAME,
          Key: newFileId,
          Body: data
        });

        await Promise.all([
          s3Client.send(deleteCommand),
          s3Client.send(putCommand)
        ]);

        return success;
      } catch (error) {
        console.error('Error in /api/rename:', error);
        return new Response('Error renaming file', { status: 500 });
      }
    } 
    // POST /api/save - Save file content
    else if (path === '/api/save' && method === 'POST') {
      try {
        const saveSchema = z.object({
          fileId: z.string(),
          data: z.string(),
        });

        const body = await request.json();
        const { fileId, data } = saveSchema.parse(body);

        const putCommand = new PutObjectCommand({
          Bucket: env.S3_BUCKET_NAME,
          Key: fileId,
          Body: data
        });

        await s3Client.send(putCommand);

        return success;
      } catch (error) {
        console.error('Error in /api/save:', error);
        return new Response('Error saving file', { status: 500 });
      }
    } 
    // POST /api/init - Initialize a new project with starter code
    else if (path === '/api/init' && method === 'POST') {
      try {
        const initSchema = z.object({
          virtualboxId: z.string(),
          type: z.enum(['react', 'node']),
        });
         console.log(initSchema)
        let body;
        try {
          body = await request.json();
        } catch (error) {
          console.error('Error parsing JSON in /api/init:', error);
          return new Response('Invalid JSON in request body', { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // Validate the request body against the schema
        try {
          const { virtualboxId, type } = initSchema.parse(body);
          console.log("type starter code---> ",startercode[type])
          console.log(`Initializing project type: ${type} for virtualboxId: ${virtualboxId}`);
          console.log(`Starter code available: ${JSON.stringify(Object.keys(startercode))}`);
          
          if (!startercode[type]) {
            return new Response(`Invalid project type: ${type}`, { status: 400 });
          }
          console.log("bucket_name",env.S3_BUCKET_NAME)
          // Create each file from the starter code template
          await Promise.all(
            startercode[type].map(async (file) => {
              const putCommand = new PutObjectCommand({
                Bucket: env.S3_BUCKET_NAME,
                Key: `projects/${virtualboxId}/${file.name}`,
                Body: file.body
              });
              console.log("putCommand",putCommand)
              return s3Client.send(putCommand);
            })
          );

          return success;
        } catch (error) {
          if (error instanceof z.ZodError) {
            console.error('Zod validation error:', JSON.stringify(error.issues));
            return new Response(JSON.stringify({ error: 'Validation error', issues: error.issues }), { 
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            });
          }
          throw error;
        }
      } catch (error) {
        console.error('Error in /api/init:', error);
        return new Response('Error initializing project', { status: 500 });
      }
    } else {
      return notFound;
    }

    // Default return for /api/save endpoint (adding this to fix the missing return statement)
    return success;
  },
};