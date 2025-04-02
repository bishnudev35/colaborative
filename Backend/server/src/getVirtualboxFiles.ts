import { TFile, TFolder ,ApiResponse,ApiFolder} from "./types";
const getVirtualboxFiles=async (id:string)=>{
    console.log("id",id)
    const virtualboxRes=await fetch(
      `https://storage.databse.workers.dev/api?virtualboxId=${id}`
    );
    console.log("virtual respanse data",virtualboxRes)
    const virtualboxData=await virtualboxRes.json()
   
   
    return processFiles(virtualboxData,id);
  
  }
 
 

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

  export default getVirtualboxFiles;