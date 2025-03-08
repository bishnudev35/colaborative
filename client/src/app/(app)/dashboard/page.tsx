import Dashboard from "@/components/dashboard";
import Navbar from "@/components/navbar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {User} from "@/lib/types"

export default async function dashboardPage(){
    const user = await currentUser();
  
    if (!user) {
      redirect("/");
    }

    const userRes= await fetch(`https://database.databse.workers.dev/api/user?id=${user.id}`);
    const userData=(await userRes.json()) as User;
    console.log("userData",userData);
    return (
        <div>
            <Navbar userData={userData}/>
          <Dashboard virtualboxes={userData.virtualbox}/>
        </div>
    );
}
