"use client"
import {X} from "lucide-react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import  {Button} from  "@/components/ui/button";
import { Editor } from "@monaco-editor/react";
import { useRef } from "react";
import monaco, { editor } from "monaco-editor";
import { OnMount } from "@monaco-editor/react";
import Sidebar from "./sidebar";



export default function CodeEditor(){
const editorRef=useRef<null | monaco.editor.IStandaloneCodeEditor>(null);
 const handleEditorMount: OnMount=(editor,monaco)=>{
    editorRef.current=editor;
 };
    return(
        <>
       <Sidebar/>
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
             maxSize={75}
              minSize={30}
               defaultSize={60}
               className=" flex flex-col p-2"
               >
                <div className="h-10 w-full flex gap-2">
                    <Button variant={"secondary"} size={"sm"} className="min-w-20 justify-between">
                    index.html <X className="w-3 h-3"/>
                    </Button>
                    <Button variant={"secondary"} size={"sm"} className="min-w-20 justify-between">
                    style.css <X className="w-3 h-3"/>
                    </Button>
                </div>
                <div className="grow w-full overflow-hidden rounded-lg">
                    <Editor height={"100%"} defaultLanguage="typescript" theme="vs-dark"
                    onMount={handleEditorMount}
                    options={
                        {
                            minimap:{
                                enabled:false,
                            },padding:{
                                bottom:4,
                                top:4
                            },
                            scrollBeyondLastLine:false,
                        
                    }}
                    />
                </div>
            </ResizablePanel>
            <ResizableHandle/>
            <ResizablePanel defaultSize={40}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={50} minSize={20} className="p-2 flex flex-col">
                    <div className="h-10 w-full flex gap-2">
                    <Button variant={"secondary"} size={"sm"} className="min-w-20 justify-between">
                    locallhost:3000 <X className="w-3 h-3"/>
                    </Button>
                   
                </div>
                <div className="w-full grow rounded-lg bg-foreground">

                </div>
                    </ResizablePanel>
                    <ResizableHandle/>
                    <ResizablePanel defaultSize={50} minSize={20} className="p-2 flex flex-col">
                    <div className="h-10 w-full flex gap-2">
                    <Button variant={"secondary"} size={"sm"} className="min-w-20 justify-between">
                   Node<X className="w-3 h-3"/>
                    </Button>
                   
                </div>
                <div className="w-full grow rounded-lg bg-foreground">

                </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
        </>
    );
}