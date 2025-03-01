"use client"
// import CodeEditor from "@/components/editor";
import Navbar from "@/components/navbar";
import { useClerk } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import Image from "next/image";

const CodeEditor=dynamic(()=>import("@/components/editor"),{
  ssr: false,
});

export default function Home() {

  const clerk=useClerk();
  return (
   <div className="flex w-screen flex-col h-screen bg-background">
  <Navbar/>
  <div className="w-screen flex grow">
    {clerk.loaded?<CodeEditor/>:null}
   
    </div>
   </div>
  );
}
