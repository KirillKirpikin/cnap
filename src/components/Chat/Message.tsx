import React, { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import FileUploadForForm from "../FileUpload/FileUploadForForm";
import { ChatMessage } from "../../types/chat.types";
import { sendMessage } from "../../utils/chatMessage";
import MessageOther from "../Message/MessageOther";
import MessageMy from "../Message/MessageMy";

import styles from "./chat.module.scss";
import SpinerCircle from "../Spiner/SpinerCircle";

interface AdminChatProps {
    name: string;
    phoneNumber: string;
}

const Message: React.FC<AdminChatProps> = ({ name, phoneNumber }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const [roomId, setRoomId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const listRef = useRef<HTMLUListElement | null>(null);

    const handleClick = () => {
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleClick();
        }
    };

    useEffect(() => {
        if (phoneNumber) {
            setRoomId(phoneNumber);
            const newSocket = io(
                `${
                    import.meta.env.VITE_BASE_WS
                }?roomId=${phoneNumber}&name=${name}`
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
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phoneNumber]);

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
                            <MessageOther key={index} message={message} />
                        ) : (
                            <MessageMy key={index} message={message} />
                        )}
                    </li>
                ))}
            </ul>
            <div className={styles.bottom}>
                <div className={styles.send}>
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={2}
                        placeholder="Напишіть своє запитання"
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

export default Message;
