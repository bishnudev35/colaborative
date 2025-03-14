"use client"
import {  Code2, FolderDot, Globe, HelpCircle, Plus, Settings, User } from "lucide-react";
import CustomButton from "../ui/customButton";
import { Button } from "../ui/button";
import { useState } from "react";

import { Virtualbox } from "@/lib/types";
import DashboardSharedWithMe from "./shared";
import DashboardProjects from "./projects";
import NewProjectModel from "./newProject";

type TScreen="project" | "shared"|"settings"|"search";

export default function Dashboard( {virtualboxes}:{virtualboxes:Virtualbox[]}){
    console.log("bishnu",virtualboxes);
const [screen, setScreen]=useState<TScreen>("project");
const [newProjectModelOpen, setnewProjectModelOpen]=useState(false);

const  activeScreen=(s:TScreen)=>{
    if(screen===s)return "justify-start";
    else return "justify-start font-normal text-muted-foreground";
}
    return(
        <>
        < NewProjectModel open={newProjectModelOpen} setOpen={setnewProjectModelOpen}/>
         <div className="flex grow w-full">
        <div className="w-56 border-r border-border p-4 justify-between flex flex-col">
            <div className="flex flex-col">
                <CustomButton className="mb-4" onClick={()=>setnewProjectModelOpen(true)}>
                    <Plus className="h-4 w-4"/>
    
                </CustomButton>
                <Button variant={"ghost"}
                 onClick={()=>{setScreen("project")}}
                    className={activeScreen("project")}>
                    <FolderDot className="w-4 h-4 mr-2"/>
                    My Project
                </Button>

                <Button variant={"ghost"}
                 onClick={()=>{setScreen("shared")}}
                    className={activeScreen("shared")}>
                    <User className="w-4 h-4 mr-2"/>
                   Shared With Me
                </Button>
                <Button variant={"ghost"}
                 onClick={()=>{setScreen("settings")}}
                    className={activeScreen("settings")}>
                    <Settings className="w-4 h-4 mr-2"/>
                 Settings
                </Button>

                <Button variant={"ghost"} className=" justify-start font-normal text-muted-foreground">
                <Code2 className="w-4 h-4 mr-2"/>
                Github repo
            </Button>
            <Button variant={"ghost"} className="justify-start font-normal text-muted-foreground">
                <HelpCircle className="w-4 h-4 mr-2"/>
                About
            </Button>

            </div>
            <div className="flex flex-col">
          
            </div>
           
        </div>
        {screen==="project"?( 
     <DashboardProjects virtualboxes={virtualboxes}/>
 ):screen==="shared"?<DashboardSharedWithMe  virtualboxes={virtualboxes}/>
  :screen==="settings"?null:null}
      
        </div>
        </>
       
    );
}