import CodeEditor from "@/components/editor";
import Navbar from "@/components/editor/navbar";
import { User } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const userRes = await fetch(`https://database.databse.workers.dev/api/user?id=${user.id}`);
  const userData = (await userRes.json()) as User;

  return (
    <div className="flex w-screen flex-col h-screen bg-background">
      <Navbar userData={userData} />
      <div className="w-screen flex grow">
        <CodeEditor />
      </div>
    </div>
  );
}
