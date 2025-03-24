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

  export type R2File={
    object:R2FileData[];
    truncated:boolean;
    delimitedPrefixes:any[];
}

  export type R2FileData={
    storageClass:string
    uploded:string
    checkSum:any
    httpFtag:string
    etag:string
    size:number
    version:string
    key:string
}