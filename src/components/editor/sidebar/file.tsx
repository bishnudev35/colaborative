"use client"

import { TFile } from "./types";
import Image from "next/image";
import { getIconForFile } from "vscode-icons-js";


export default function SidebarFile({data}:{data:TFile}){
    return(
        <div className="flex items-center px-1 py-1.5 rounded-md text-slate-300 hover:bg-slate-800 cursor-pointer transition-colors group">
 
    <Image
      src={`/icons/${getIconForFile("style.css")}`}
      alt="File Icon"
      height={16}
      width={16}
      className="mr-2"
      
    />
  {data.name}
</div>
    );

}