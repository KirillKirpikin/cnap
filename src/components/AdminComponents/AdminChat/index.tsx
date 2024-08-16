/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AdminMessage from "./AdminMessage";
import { useGetAllChatQuery } from "../../../store/api/chat.api";
import AdminChatElement from "./AdminChatElement";
import styles from "./chat-admin.module.scss";
import SpinerCircle from "../../Spiner/SpinerCircle";

const AdminChat: React.FC = () => {
    const [room, setRoom] = useState<string | null>(null);
    const { data, isLoading, refetch } = useGetAllChatQuery(null);

    const fetchData = async () => {
        await refetch();
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);
    }, [refetch]);

    return (
        <div className={styles.chats}>
            <div className={styles.left}>
                {isLoading ? (
                    <SpinerCircle />
                ) : data && data.length > 0 ? (
                    data.map((item) => (
                        <AdminChatElement
                            key={item._id}
                            item={item}
                            setRoom={setRoom}
                            room={room}
                            fetchData={fetchData}
                        />
                    ))
                ) : (
                    <div className={styles.none}>Немає чатів</div>
                )}
            </div>
            {room ? (
                <AdminMessage room={room} />
            ) : (
                <div className={styles.notFound}>Оберіть чат</div>
            )}
        </div>
    );
};

export default AdminChat;
