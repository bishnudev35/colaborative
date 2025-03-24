"use client";
import { Dialog, DialogHeader,DialogContent, DialogTitle } from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { useState } from "react";
import Image from "next/image";
import {z} from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Select,SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomButton from "../ui/customButton";

 type TOption="react"|"node";

 const data:{
    id: TOption,
    name: string,
    icon:string,
    description: string
}[]=[
    {
        id: "react",
        name: "React",
        icon: "/project-icons/react.svg",
        description: "A declarative, efficient, and flexible JavaScript library for building user interfaces."
    },
    {
        id: "node",
        name: "Node.js",
        icon: "/project-icons/node.svg",
        description: "A JavaScript runtime built on Chrome's V8 JavaScript engine."
    }
];

const formSchema=z.object({
    name:z.string().min(1).max(16),
    visibility:z.enum(["public","private"])
})

export default function NewProjectModel({
    open,
    setOpen
}:{
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
   const [selected, setSelected] = useState<TOption>("react");
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        visibility: "public"
    }
});


function onSubmit(value:z.infer<typeof formSchema>){
  const virtualbox={type:selected,...value};
  
}
   return(
   <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>creat a virtualbox</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 w-full gap-2 mt-2">
  {data.map((item) => (
    <button
      onClick={() => setSelected(item.id)}
      key={item.id}
      className={`
        rounded-md border bg-card shadow-sm
        text-left p-4 flex flex-col items-center
        transition-colors gap-3
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-ring
        focus-visible:ring-offset-2 focus-visible:ring-offset-background
        ${selected === item.id ? "border-foreground" : "border-border"}
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <Image 
            alt={item.name}
            src={item.icon}
            width={30}
            height={30}
            className="shrink-0"
          />
          <div className="font-semibold text-base">{item.name}</div>
        </div>
        <div className="text-xs text-muted-foreground text-start leading-5">
          {item.description}
        </div>
      </div>
    </button>
  ))}
       </div>
       <Form {...form}>
        <form>
        <FormField control={form.control} name="name" render={({field})=>(
            <FormItem className="mb-4">
             <FormLabel>Name</FormLabel>
             <FormControl>
                <Input placeholder="My project..."{...field}/>

             </FormControl>
            </FormItem>
        )}>

        </FormField>
        <FormField control={form.control} name="visibility" render={({field})=>(
            <FormItem className="mb-4">
              <FormLabel>Visibility</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                        <SelectValue/>
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>

                    </SelectContent>
                

              </Select>
              <FormMessage/>
            </FormItem>
        )}>
            </FormField>
           <CustomButton type="submit"  className="w-full">
           Creat Project
           </CustomButton>
        </form>
        </Form>


    </DialogContent>
   </Dialog>
   );
}