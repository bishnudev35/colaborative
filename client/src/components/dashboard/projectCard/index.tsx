import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link"; // Import Link if navigation is needed

export default function ProjectCard({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  return (
    <Link
      href={`/code/${id}`}
      className={cn(
        className,
        "rounded-lg border bg-card text-card-foreground shadow h-48 p-[1px] gradient-project-card-bg cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      )}
    >
      <div
        className="rounded-[17px] p-4 h-full flex flex-col
         justify-between gradient-project-card"
      >
        {children}
      </div>
    </Link>
  );
}
