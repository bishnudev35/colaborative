"use client"
import { Code2, FolderDot, HelpCircle, Plus, Settings, User } from "lucide-react";
import CustomButton from "../ui/customButton";
import { Button } from "../ui/button";
import { useState } from "react";

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
            </div>
            <div className="flex flex-col">
            <Button variant={"ghost"} className=" justify-start font-normal text-muted-foreground">
                <Code2 className="w-4 h-4 mr-2"/>
                Github repo
            </Button>
            <Button variant={"ghost"} className="justify-start font-normal text-muted-foreground">
                <HelpCircle className="w-4 h-4 mr-2"/>
                About
            </Button>

            </div>
           
        </div>
        <div className="gorw flex flex-col items-start p-4">
                <h1 className="text-2xl font-medium text-center">
                    a real time colaborative code editor,let's start colaborate
                </h1>
            </div>
        </div>
    );
}