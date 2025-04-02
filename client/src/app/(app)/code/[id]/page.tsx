import CodeEditor from "@/components/editor";
import Navbar from "@/components/editor/navbar";

import {  User } from "@/lib/types";
import { ApiResponse, TFile, TFolder } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import {  redirect } from "next/navigation";
import path from "path";


const getUserData=async(id:string)=>{
  const userRes = await fetch(`https://database.databse.workers.dev/api/user?id=${id}`);
  console.log("user",userRes)
  const userData = (await userRes.json()) as User;
  console.log("user data",userData)
  return userData;
};
const getVirtualboxFiles=async (id:string)=>{
  console.log("id",id)
  const virtualboxRes=await fetch(
    `https://storage.databse.workers.dev/api?virtualboxId=${id}`
  );
  console.log("virtual respanse data",virtualboxRes)
  const virtualboxData=await virtualboxRes.json()
 
 
  return processFiles(virtualboxData,id);

}
// const processFiles = (paths: string[], id: string) => {
//   const root: TFolder = { id: "/", type: "folder", name: "/", children: [] };
  
//   paths.forEach((path) => {
//     const allParts = path.split("/").filter(part => part.trim() !== '');
//     console.log("All Parts:", allParts);

//     // Validate project ID
  
//     const parts = allParts; // Remove project ID from parts
//     console.log("Processed Parts:", parts);

//     let current: TFolder = root;
    
//     for (let i = 0; i < parts.length; i++) {
//       const part = parts[i];
//       const isFile = i === parts.length - 1 && part.includes(".");
      
//       // Find existing child
//       const existing = current.children.find((child) => child.name === part);

//       if (existing) {
//         if (!isFile && existing.type === "folder") {
//           current = existing as TFolder;
//         }
//       } else {
//         if (isFile) {
//           // It's a file
//           const file: TFile = {
//             id: path,
//             type: "file",
//             name: part
//           };
//           current.children.push(file);
//         } else {
//           // It's a folder
//           const folder: TFolder = {
//             id: path,
//             type: "folder",
//             name: part,
//             children: []
//           };
//           current.children.push(folder);
//           current = folder;
//         }
//       }
//     }
//   });

//   return root.children;
// };


console.log("going to process files")


const processFiles = (apiResponse: ApiResponse, id: string): (TFolder | TFile)[] => {
  const root: TFolder = { id: "/", type: "folder", name: "/", children: [] };
  
  // Process root level files
  apiResponse.objects.forEach((object) => {
    const file: TFile = { 
      id: object.fullPath, 
      type: "file", 
      name: object.key 
    };
    root.children.push(file);
  });
  
  // Process folders recursively
  const processFolder = (apiFolder: ApiFolder, parentFolder: TFolder) => {
    // Create the folder
    const folder: TFolder = { 
      id: apiFolder.path, 
      type: "folder", 
      name: apiFolder.name, 
      children: [] 
    };
    
    parentFolder.children.push(folder);
    
    // Add files to this folder
    apiFolder.files.forEach((file) => {
      folder.children.push({
        id: file.fullPath,
        type: "file",
        name: file.key
      });
    });
    
    // Process subfolders recursively
    apiFolder.folders.forEach((subfolder) => {
      processFolder(subfolder, folder);
    });
  };
  
  // Process top-level folders
  apiResponse.folders.forEach((folder) => {
    processFolder(folder, root);
  });
  
  return root.children;
};
export default async function CodePage({params}:{params:{id:string}}) {
  const user = await currentUser();
  const virtualboxId=params.id;

  if (!user) {
    redirect("/");
  }

const userData=await getUserData(user.id);
const virtualboxFiles=await getVirtualboxFiles(virtualboxId);

  return (
    <div className="flex w-screen flex-col h-screen bg-background">
      <Navbar userData={userData} />
      <div className="w-screen flex grow">
        <CodeEditor files={virtualboxFiles}/>
      </div>
    </div>
  );
}
