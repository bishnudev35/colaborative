import { FilePlus, FolderPlus, Search,File, Folder } from "lucide-react";
import { TFile, TFolder } from "./types";
import SidebarFile from "./file";
import SidebarFolder from "./folder";


const data:(TFile|TFolder)[]=[{
  id:"index.html",
  type:"file",
  name:"index.html"
},{
  id:"component",
  type:"folder",
  name:"component",
  children:[{
    id:"navebar.tsx",
    type:"file",
    name:"navebar.tsx"
  },{
    id:"ui",
    type:"folder",
    name:"ui",
    children:[{
      id:"button.tsx",
      type:"file",
      name:"button.tsx"
    },{
      id:"input.tsx",
      type:"file",
      name:"input.tsx"
    }],
  },{
    id:"style",
    type:"folder",
    name:"style",
    children:[{
        id:"style.tsx",
        type:"file",
        name:"style.tsx",
    }]
  },]
}]

export default function Sidebar(){
    return(
    <div className="h-full w-56 flex flex-col items-center p-2">
<div className="flex w-full items-center justify-between h-8 mb-1">
 <div className="text-muted-foreground">EXPLOAR</div>   
 <div className="flex space-x-1">
    <div className="h-6 w-6 text-muted-foreground ml-0.5 flex items-center
     translate-x-1 transition-colors bg-transparent
    hover:bg-muted-foreground/25 cursor-pointer rounded-sm  ">
        <FilePlus className="h-4 w-4"/>
    </div>
    <div className="h-6 w-6 text-muted-foreground ml-0.5 flex items-center  translate-x-1 transition-colors bg-transparent
    hover:bg-muted-foreground/25 cursor-pointer rounded-sm">
        <FolderPlus className="h-4 w-4"/>
    </div>
    <div className="h-6 w-6 text-muted-foreground ml-0.5 flex items-center  translate-x-1 transition-colors bg-transparent
    hover:bg-muted-foreground/25 cursor-pointer rounded-sm">
        <Search className="w-4 h-4"/>
    </div>
 </div>
</div>
<div className="w-full mt-2 flex-col">
 {data.map((child)=>child.type==="file"?(
 <SidebarFile key={child.id} data={child}/>)
 : (
 <SidebarFolder key={child.id} data={child}/>
)
)}
</div>
    </div>);
}
