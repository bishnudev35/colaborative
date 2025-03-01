import Navbar from "@/components/navbar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function dashboardPage(){
    const user = await currentUser();
  
    if (!user) {
      redirect("/");
    }
    return (
        <div>
            <Navbar/>
            <h1>dashboard</h1>
        </div>
    );
}
