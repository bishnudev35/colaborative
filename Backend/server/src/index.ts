import express,{Express} from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import getVirtualboxFiles from './getVirtualboxFiles';
import {z} from 'zod';
const app:Express=express( );
const PORT=process.env.PORT||4000;

 const httpServer=createServer(app);

 const io =new Server(httpServer,{
    cors:{
        origin:"*",
    },
});

const handshakeSchema=z.object({
    userId:z.string(),
    virtualboxId:z.string(),
    type:z.enum(["node","react"]),
    EIO:z.string(),
    transport:z.string(),
})


io.use(async(socket,next)=>{
    const q=socket.handshake.query;
    console.log("middleware");
    console.log(q);

    
    const parsedQuery=handshakeSchema.safeParse(q);

    if(!parsedQuery.success){
        console.log("invalid query",parsedQuery.error);
        return next(new Error("Invalid query"));
    }
    const {userId,virtualboxId}=parsedQuery.data;      

    if(!q.userId || !q.virtualboxId){
        return next(new Error("Invalid request"));
    }        



const dbUser=await fetch(`https://database.databse.workers.dev/api/user?id=${q.userId}`);
const dbUserJSON=await dbUser.json();


if(!dbUserJSON){
    return next(new Error("DB error invalid credentials"));
}
const virtualbox=dbUserJSON.virtualbox.find((v:any)=> v.id===q.virtualboxId)

if(!virtualbox){
    return next(new Error("invalid credentials"));}
   
socket.data={
     id:virtualboxId,
     type,
     userId,
    };


if(!dbUserJSON ||!dbUserJSON.virtualboxId.includes(q.virtualboxId)){
    return next(new Error("invalid credentials"));
}

next();
}
);

io.on("connection",async(socket)=>{
    const data=socket.data as {
        id:string;
        type:"node"|"react";
        userId:string;
    }
    console.log("connected");
   const userId=socket.handshake.query.userId;

   console.log(userId);

});

httpServer.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});


