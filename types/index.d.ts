
declare type FileType = "document" | "image" | "video" | "audio" | "other";

// action dropdown type
declare interface ActionType {
    label: string;
    icon: string;
    value: string;
}

// file type
declare interface FileState {
    _id: string;
    name: string;
    extension: string;
    size: number;
    type: string;
    url: string;
    userId?: string;
    username?:string
    createdAt: string;
    updatedAt?:string
}