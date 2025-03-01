"use client";

import { useState } from "react";
import { TFolder } from "./types";
import { getIconForFolder, getIconForOpenFolder } from "vscode-icons-js";
import Image from "next/image";
import SidebarFile from "./file";

export default function SidebarFolder({ data }: { data: TFolder }) {
  const [isOpen, setIsOpen] = useState(false);
  const folder = isOpen ? getIconForOpenFolder(data.name) : getIconForFolder(data.name);

  return (
    <>
      <div
         onClick={() => setIsOpen((prev) => !prev)}
         className=" w-full flex items-center h-7 px-1 transition-colors hover:bg-secondary cursor-pointer rounded-sm"
       >
         <Image
           src={`/icons/${folder}`}
           alt="Folder icon"
           width={18}
           height={18}
           className="mr-2"
         /> 
         {data.name}
      </div>

      {isOpen ? (
        <div className="flex w-full">
          <div className="w-[2px] bg-border mx-2 h-full"></div>
          <div className="flex flex-col grow">
            {data.children.map((child) =>
              child.type === "file" ? (
                <SidebarFile key={child.id} data={child} />
              ) : (
                <SidebarFolder key={child.id} data={child} />
              )
            )}
          </div>
        </div>
      ): null}
    </>
  );
}
