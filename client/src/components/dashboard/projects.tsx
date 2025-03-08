import { Virtualbox } from "@/lib/types";
import ProjectCard from "./projectCard";
import ProjectCardDropdown from "./projectCard/dropdown";
import { Clock, Globe } from "lucide-react";
import Image from "next/image";

export default function DashboardProjects({
  virtualboxes,
}: {
  virtualboxes: Virtualbox[];
}) {
  return (
    <div className="grow p-4 flex flex-col">
      {/* <div className="text-xl font-medium mb-8">Shared with me</div> */}
      <div className="grow w-full">
       {virtualboxes.map((virtualbox) => (
            <ProjectCard 
              key={virtualbox.id} 
              className="relative p-4 rounded-xl shadow-lg transition-all hover:shadow-xl gradient-project-card-bg"
            >
              {/* Dropdown at top-right */}
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
          ))}
      </div>
    </div>
  );
}
