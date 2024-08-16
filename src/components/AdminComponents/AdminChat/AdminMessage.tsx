import React, { useState, useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";
import { ChatMessage } from "../../../types/chat.types";
import FileUploadForForm from "../../FileUpload/FileUploadForForm";
import styles from "./chat-admin.module.scss";
import { sendMessage } from "../../../utils/chatMessage";
import MessageOther from "../../Message/MessageOther";
import MessageMy from "../../Message/MessageMy";
import SpinerCircle from "../../Spiner/SpinerCircle";

interface IProps {
    room: string;
}

const AdminMessage: React.FC<IProps> = ({ room }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const [roomId, setRoomId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const listRef = useRef<HTMLUListElement | null>(null);

    const handleTextareaInput = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        event.target.style.height = "auto";
        event.target.style.height = event.target.scrollHeight + "px";
        setNewMessage(event.target.value);
    };
    const handleClick = () => {
        const name = "Оператор";
        if (roomId) {
            sendMessage({
                selectedFiles,
                newMessage,
                roomId,
                socket,
                setSelectedFiles,
                setNewMessage,
                name,
                setLoading,
            });
        }
    };

    useEffect(() => {
        if (room) {
            setRoomId(room);
            const newSocket = io(
                `${import.meta.env.VITE_BASE_WS}?roomId=${room}&name=Оператор`
            );
            setSocket(newSocket);

            newSocket.on("allMessages", (allMessages: ChatMessage[]) => {
                setMessages(allMessages);
            });

            newSocket.on("recMessage", (message: ChatMessage) => {
                setMessages((prevMessages) => [...prevMessages, message]);
                setLoading(false);
            });

            return () => {
                newSocket.disconnect();
                setLoading(false);
            };
        }
    }, [room]);
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={styles.chat}>
            <ul className={styles.list} ref={listRef}>
                {messages.map((message, index) => (
                    <li key={index}>
                        {message.username === "Оператор" ? (
                            <MessageMy key={index} message={message} />
                        ) : (
                            <MessageOther key={index} message={message} />
                        )}
                    </li>
                ))}
            </ul>
            <div className={styles.bottom}>
                <div className={styles.input}>
                    <textarea
                        value={newMessage}
                        onInput={handleTextareaInput}
                        rows={2}
                        placeholder="Type your message"
                    ></textarea>
                </div>
                <div className={styles.btns}>
                    {loading ? (
                        <SpinerCircle
                            w="45px"
                            h="45px"
                            height="60%"
                            mr="40px"
                        />
                    ) : (
                        <>
                            <FileUploadForForm
                                selectedFiles={selectedFiles}
                                setSelectedFiles={setSelectedFiles}
                                quantity={1}
                            />
                            <button onClick={handleClick}>
                                <svg
                                    width="34"
                                    height="39"
                                    viewBox="0 0 34 39"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.149 30.6176L3.29276 25.8609C0.185679 24.4998 -0.223534 20.2556 2.56844 18.3274L26.1244 2.04535C29.1312 -0.0339749 33.203 2.31686 32.9056 5.96052L30.5848 34.5027C30.3091 37.8836 26.4307 39.6524 23.6985 37.6421L14.149 30.6176ZM14.149 30.6176L21.7323 17.4829"
                                        stroke="#3669AE"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminMessage;
