"use server"

export async function creatVirtualbox(body:{
    type:string;
   name:string;
   visiblity:string;

    }) {
        const res=await fetch(
            "https://database.databse.workers.dev/api/virtualbox/create",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                  
                },
                body:JSON.stringify(body),
            }
        )
    
}