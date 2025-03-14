export type User={
    id:string;
    name:string;
    email:string;
    virtualbox:Virtualbox[];
}

export type Virtualbox={
    id:string;
    name:string;
    type:"react"|"node";
    bucket:string|null;
    userID:string;
}