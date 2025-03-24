"use client"

import { TFile } from "./types";
import Image from "next/image";
import { useState } from "react";
import { getIconForFile } from "vscode-icons-js";


export default function SidebarFile({
  data,
  selectFile,}:{
  data:TFile,
  selectFile:(file:TFile)=>void,
}){
  const [imgSrc,setImgsrc]=useState( `/icons/${getIconForFile(data.name)}`)
    return(
        <button onClick={()=>selectFile(data)} className="flex items-center h-7  px-1 py-1.5 rounded-md text-slate-300 hover:bg-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-slate-800 cursor-pointer transition-colors group">
 
    <Image
      src={imgSrc}
      alt="File Icon"
      height={16}
      width={16}
      className="mr-2"
      onError={()=>setImgsrc("/icons/default_file.svg")}
    />
  {data.name}
</button>
    );

}