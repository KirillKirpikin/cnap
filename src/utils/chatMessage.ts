import { Dispatch, SetStateAction } from "react";
import { Flip, toast } from "react-toastify";
import { Socket} from "socket.io-client";
// import { ChatMessage } from "../types/chat.types";

interface ISendMessage {
    selectedFiles?: File[]
    newMessage?: string;
    socket: Socket| null;
    roomId: string;
    name: string
    setSelectedFiles: Dispatch<SetStateAction<File[]>>;
    setNewMessage: Dispatch<SetStateAction<string>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

export const sendMessage = ({selectedFiles, newMessage, roomId, socket, setSelectedFiles, setNewMessage, name, setLoading}: ISendMessage) => {
    if(selectedFiles && selectedFiles?.length > 0 && newMessage === ""){
        setLoading(true)
        socket?.emit("sendMessage", { file: {fileType: selectedFiles[0].type,file:selectedFiles[0]}, message: '', username: name, roomId: roomId, created: Date.now()});
    }else if (selectedFiles && selectedFiles.length == 0 && newMessage && newMessage.length > 0){        
        socket?.emit("sendMessage", { file: null, message: newMessage, username: name, roomId: roomId, created: Date.now()});      
    } else if(selectedFiles && selectedFiles.length > 0 && newMessage &&  newMessage.length > 0){
        setLoading(true)
        socket?.emit("sendMessage", { file: {fileType: selectedFiles[0].type,file:selectedFiles[0]}, message: newMessage, username: name, roomId: roomId, created: Date.now()});
    } else{
        return toast.warn('Повілрмлення не може бути пустим', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Flip,
            });
    }
    setSelectedFiles([]);      
    setNewMessage("");
};
