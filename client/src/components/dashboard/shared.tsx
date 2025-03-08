import { Virtualbox } from "@/lib/types";
import { Table, TableBody, TableCell } from "../ui/table";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

export default function DashboardSharedWithMe({
  virtualboxes,
}: {
  virtualboxes: Virtualbox[];
}) {
  return (
    <div className="grow p-4 flex flex-col">
      <div className="text-xl font-medium mb-8">Shared with me</div>
      <div className="grow w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Virtual Box</TableHead>
              <TableHead>Shared By</TableHead>
              <TableHead>Opened</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {virtualboxes.map((virtualbox) => (
              <TableRow key={virtualbox.id}>
                <TableCell>
                  <div className="front-medium flex items-center gap-2">
                    <Image
                      src={
                        virtualbox.type === "react"
                          ? "/project-icons/react.svg"
                          : "/project-icons/node.svg"
                      }
                      width={20}
                      height={20}
                      alt={
                        virtualbox.type === "react"
                          ? "React Project Icon"
                          : "Node.js Project Icon"
                      }
                    />
                    {virtualbox.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-5 w-5 bg-red-500 rounded-full mr-2"/>
                    bishnu dev
                  </div>
                </TableCell>
                <TableCell>{new Date().toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button>
                    Open <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
