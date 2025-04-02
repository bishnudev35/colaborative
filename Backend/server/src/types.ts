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

export type TFile ={
  id: string;
  type: "file";
  name: string;
}

export type TFolder ={
  id: string;
  type: "folder";
  name: string;
  children: (TFolder | TFile)[];
}

export type ApiObject= {
  key: string;
  fullPath: string;
  size: number;
  etag: string;
  uploaded: string;
}

export type ApiFolder ={
  name: string;
  path: string;
  files: ApiObject[];
  folders: ApiFolder[];
}

export type ApiResponse ={
  objects: ApiObject[];
  folders: ApiFolder[];
  truncated: boolean;
}
