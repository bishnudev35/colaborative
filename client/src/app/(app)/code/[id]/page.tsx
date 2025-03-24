import CodeEditor from "@/components/editor";
import Navbar from "@/components/editor/navbar";
import { TFile, TFolder } from "@/components/editor/sidebar/types";
import { R2File, User } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
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
    `http://127.0.0.1:8787/api?virtualboxId=${id}`
  );
  
  const virtualboxData=await virtualboxRes.json()
  console.log("Virtualbox",virtualboxData)
  if(virtualboxData.objects.size===0) return notFound()
    const paths=virtualboxData.objects.map((obj:any)=>obj.key);
 console.log("paths",paths)
 
  return processFiles(paths,id);

}
const processFiles = (paths: string[], id: string) => {
  const root: TFolder = { id: "/", type: "folder", name: "/", children: [] };
  
  paths.forEach((path) => {
    const allParts = path.split("/").filter(part => part.trim() !== '');
    console.log("All Parts:", allParts);

    // Validate project ID
  
    const parts = allParts.slice(1); // Remove project ID from parts
    console.log("Processed Parts:", parts);

    let current: TFolder = root;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1 && part.includes(".");
      
      // Find existing child
      const existing = current.children.find((child) => child.name === part);

      if (existing) {
        if (!isFile && existing.type === "folder") {
          current = existing as TFolder;
        }
      } else {
        if (isFile) {
          // It's a file
          const file: TFile = {
            id: path,
            type: "file",
            name: part
          };
          current.children.push(file);
        } else {
          // It's a folder
          const folder: TFolder = {
            id: path,
            type: "folder",
            name: part,
            children: []
          };
          current.children.push(folder);
          current = folder;
        }
      }
    }
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
