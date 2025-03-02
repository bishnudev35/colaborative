"use client"
import { Clock, Code2, FolderDot, Globe, HelpCircle, Plus, Settings, User } from "lucide-react";
import CustomButton from "../ui/customButton";
import { Button } from "../ui/button";
import { useState } from "react";
import ProjectCard from "./projectCard";

type TScreen="project" | "shared"|"settings"|"search";

export default function Dashboard(){
const [screen, setScreen]=useState<TScreen>("project");
const  activeScreen=(s:TScreen)=>{
    if(screen===s)return "justify-start";
    else return "justify-start font-normal text-muted-foreground";
}
    return(
        <div className="flex grow w-full">
        <div className="w-56 border-r border-border p-4 justify-between flex flex-col">
            <div className="flex flex-col">
                <CustomButton className="mb-4">
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
                   Shared Room
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
        <div className="flex-1 p-8 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProjectCard>
            <div className="text-lg font-medium mb-2">React Project 1</div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Public
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                3d ago
              </div>
            </div>
          </ProjectCard>

          <ProjectCard>
            <div className="text-lg font-medium mb-2">Next.js Dashboard</div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Public
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                1d ago
              </div>
            </div>
          </ProjectCard>

          <ProjectCard>
            <div className="text-lg font-medium mb-2">E-commerce API</div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Private
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                5d ago
              </div>
            </div>
          </ProjectCard>

          <ProjectCard>
            <div className="text-lg font-medium mb-2">UI Component Library</div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Public
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                2w ago
              </div>
            </div>
          </ProjectCard>
        </div>
      </div>
        </div>
    );
}