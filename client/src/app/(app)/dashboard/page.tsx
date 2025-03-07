import Dashboard from "@/components/dashboard";
import Navbar from "@/components/navbar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {Virtualbox} from "@/lib/types"

export default async function dashboardPage(){
    const user = await currentUser();
  
    if (!user) {
      redirect("/");
    }

    const res= await fetch(`https://database.databse.workers.dev/api/user/virtualbox?id=${user.id}`);
    const data=(await res.json()).virtualbox as Virtualbox[];
    return (
        <div>
            <Navbar/>
          <Dashboard virtualboxes={data}/>
        </div>
    );
}
