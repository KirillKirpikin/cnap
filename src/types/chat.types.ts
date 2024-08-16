export interface IChat {
    _id: string;
    roomId: string;
    name: string;
    lastMessage: string;
    notReadingCount: number;
    lastMessageDate: string | null;
}

export interface IFile {
    file: ArrayBuffer;
    fileType: string;
}

export interface ChatMessage {
    message: string;
    username: string;
    created: string;
    file: string | IFile;
}
