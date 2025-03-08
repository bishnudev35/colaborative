"use client"

import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Virtualbox } from "@/lib/types";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Ellipsis, LockIcon, Trash2 } from "lucide-react";

export default function ProjectCardDropdown({ virtualbox }: { virtualbox: Virtualbox }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="h-6 w-6 flex justify-center items-center transition-colors bg-transparent hover:bg-muted/50 rounded-md"
      >
        <Ellipsis className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 rounded-md bg-card text-card-foreground shadow-md border border-border">
        <DropdownMenuItem
          className="flex items-center gap-2 px-3 py-2 rounded-md transition-all hover:bg-accent hover:text-accent-foreground cursor-pointer"
        >
          <LockIcon className="h-4 w-4 text-muted-foreground" />
          <span>Make Private</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 px-3 py-2 rounded-md transition-all hover:bg-destructive hover:text-destructive-foreground cursor-pointer"
        >
          <Trash2 className="h-4 w-4 text-muted-foreground" />
          <span>Delete Project</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
