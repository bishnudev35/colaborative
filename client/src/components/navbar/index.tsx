import { ChevronLeftIcon, Clock, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import DashboardNavbarSearch from "./search";
import DashboardUserButton from "./userButton";

// Import SVG correctly
import Logo from "@/assets/logo.svg"; // Ensure this is handled properly
import { User } from "@/lib/types";

export default function Navbar({ userData }: { userData: User }) {
  return (
    <div className="h-14 px-2 w-full border-b border-border flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* <Button variant={"outline"} >
            <ChevronLeftIcon className="w-4 h-4 mr-2"/>
             Go Home</Button> */}

        <Link
          href={"/"}
          className="ring-offset-2 ring-offset-background 
                     focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                     disabled:pointer-events-none rounded-sm"
        >
          {/* Ensure Image is used correctly */}
          <Image src={Logo} alt="logo" width={36} height={36} priority />
        </Link>
        <div className="text-sm font-medium flex items-start">Project G-17</div>
      </div>

      <div className="flex items-center space-x-4">
        <DashboardNavbarSearch />
        <DashboardUserButton userData={userData} />
      </div>
    </div>
  );
}
