"use client";
import { useState } from "react";
import {
  Clock,
  Code2,
  FolderDot,
  Globe,
  HelpCircle,
  Plus,
  Settings,
  User,
} from "lucide-react";
import CustomButton from "../ui/customButton";
import { Button } from "../ui/button";

import { Virtualbox } from "@/lib/types";
import ProjectCard from "./projectCard";
import Image from "next/image";
import ProjectCardDropdown from "./projectCard/dropdown";

type TScreen = "project" | "shared" | "settings" | "search";

export default function Dashboard({ virtualboxes }: { virtualboxes: Virtualbox[] }) {
  const [screen, setScreen] = useState<TScreen>("project");

  const activeScreen = (s: TScreen) =>
    screen === s
      ? "justify-start font-bold"
      : "justify-start font-normal text-muted-foreground";

  return (
    <div className="flex grow w-full">
      {/* Sidebar */}
      <div className="w-56 border-r border-border p-4 flex flex-col justify-between">
        <div className="flex flex-col">
          <CustomButton className="mb-4">
            <Plus className="h-4 w-4" />
          </CustomButton>

          <Button variant="ghost" onClick={() => setScreen("project")} className={activeScreen("project")}>
            <FolderDot className="w-4 h-4 mr-2" />
            My Project
          </Button>

          <Button variant="ghost" onClick={() => setScreen("shared")} className={activeScreen("shared")}>
            <User className="w-4 h-4 mr-2" />
            Shared Room
          </Button>

          <Button variant="ghost" onClick={() => setScreen("settings")} className={activeScreen("settings")}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>

          <Button variant="ghost" className="justify-start font-normal text-muted-foreground">
            <Code2 className="w-4 h-4 mr-2" />
            GitHub Repo
          </Button>

          <Button variant="ghost" className="justify-start font-normal text-muted-foreground">
            <HelpCircle className="w-4 h-4 mr-2" />
            About
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-auto">
        {screen === "project" && (
        <div className="grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {virtualboxes.length > 0 ? (
          virtualboxes.map((virtualbox) => (
            <ProjectCard key={virtualbox.id} className="relative p-4 rounded-xl shadow-lg transition-all hover:shadow-xl gradient-project-card-bg">
              
              {/* Dropdown positioned at the top-right corner */}
              <div className="absolute top-4 right-3">
                <ProjectCardDropdown virtualbox={virtualbox} />
              </div>
      
              <div className="flex items-center space-x-2">
                <Image
                  src={virtualbox.type === "react" ? "/project-icons/react.svg" : "/project-icons/node.svg"}
                  width={20}
                  height={20}
                  alt={virtualbox.type === "react" ? "React Project Icon" : "Node.js Project Icon"}
                />
                <span className="text-lg font-medium text-foreground">{virtualbox.name}</span>
              </div>
      
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
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
          ))
        ) : (
          <p className="text-muted-foreground">No projects available</p>
        )}
      </div>
      
       
       
        )}
      </div>
    </div>
  );
}
