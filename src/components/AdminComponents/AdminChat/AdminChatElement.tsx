import React, { useState } from "react";
import { useDeleteRoomMutation } from "../../../store/api/chat.api";
import { IChat } from "../../../types/chat.types";
import { toastError, toastSuccess } from "../../../utils/toastFunction";
import { truncateText } from "../../../utils/truncateText";
import Modal from "../../Modal/Modal";
import SendLoader from "../../Spiner/SendLoader";
import styles from "./chat-admin.module.scss";

interface IElement {
    item: IChat;
    room: string | null;
    setRoom: React.Dispatch<React.SetStateAction<string | null>>;
    fetchData: () => Promise<void>;
}

const AdminChatElement: React.FC<IElement> = ({
    item,
    setRoom,
    room,
    fetchData,
}) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteRoom] = useDeleteRoomMutation();

    const text = item.lastMessage
        ? truncateText(item.lastMessage, 64)
        : item.lastMessageDate !== null
        ? "Файл"
        : "";
    const [sendIsLoading, setSendIsLoading] = useState(false);
    const handleDelete = async (id: string) => {
        setSendIsLoading(true);
        await deleteRoom(id)
            .unwrap()
            .then((data) => {
                setSendIsLoading(false);
                toastSuccess(data.message);
                setDeleteModal(false);
                setRoom(null);
            })
            .catch(() => {
                setSendIsLoading(false);
                toastError("Щось пішло не так");
            });
    };

    return (
        <>
            <SendLoader load={sendIsLoading} />
            <div
                className={`${styles.btn}  ${
                    item.notReadingCount > 0 && styles.btn_notReeading
                } ${room === item.roomId && styles.btn_active}`}
                key={item._id}
            >
                <button
                    onClick={() => {
                        fetchData();
                        setRoom((prevRoom) =>
                            prevRoom === item.roomId ? null : item.roomId
                        );
                    }}
                >
                    <h3>{item.name}</h3>
                    <div className={styles.middle}>
                        <p>{item.roomId}</p>
                        {room !== item.roomId && item.notReadingCount > 0 && (
                            <p className={styles.count}>
                                {item.notReadingCount}
                            </p>
                        )}
                    </div>
                    <p className={styles.last}>{text}</p>
                </button>
                <div
                    className={styles.delete}
                    onClick={() => setDeleteModal(true)}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.5997 1.02789L1.40034 14.2272M1.40034 1.02789L14.5997 14.2272"
                            stroke="current"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
            <Modal
                active={deleteModal}
                setActive={setDeleteModal}
                style={{ justifyContent: "center", marginTop: "150px" }}
            >
                <div className={styles.modal}>
                    <h4>Видалити чат?</h4>
                    <div className={styles.content}>
                        <p>{item.roomId}</p>
                    </div>
                    <div className={styles.btns}>
                        <button
                            onClick={() => setDeleteModal(false)}
                            className={styles.cancel}
                        >
                            Відмінити
                        </button>
                        <button
                            onClick={() => handleDelete(item._id)}
                            className={styles.del}
                        >
                            Видалити
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default AdminChatElement;
