import React, { useState } from "react";
import { Link } from "react-router-dom";
import { INews } from "../../../types/news.types";
import { truncateText } from "../../../utils/truncateText";

import SendLoader from "../../Spiner/SendLoader";
import styles from "./news-admin-element.module.scss";

interface IElementProps {
    item: INews;
    sendIsLoading: boolean;
    setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentDeleteItem: React.Dispatch<React.SetStateAction<INews | null>>;
}

const AdminNewsElement: React.FC<IElementProps> = ({
    item,
    sendIsLoading,
    setDeleteModal,
    setCurrentDeleteItem,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <SendLoader load={sendIsLoading} />
            <div
                className={styles.news}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={styles.img}>
                    <img
                        src={import.meta.env.VITE_BASE_URL_IMG + item.img}
                        alt={item.title}
                    />
                </div>
                <div className={styles.body}>
                    <h4>{truncateText(item.title, 100)}</h4>
                    <p>{item.time}</p>
                </div>
                {isHovered && (
                    <div className={styles.overlay}>
                        <Link
                            to={`update/${item._id}`}
                            className={styles.update}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50px"
                                height="50px"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="current"
                                    d="M9 9V7h9v2zm0 3v-2h9v2zm5 10v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.5 5.5zm6.575-5.6l.925-.975l-.925-.925l-.95.95zM6 22q-1.25 0-2.125-.875T3 19v-3h3V2h15v9.025q-.5-.05-1.012.038t-.988.312V4H8v12h6l-2 2v4z"
                                />
                            </svg>
                        </Link>
                        <button
                            className={styles.delete}
                            onClick={() => {
                                setDeleteModal(true);
                                setCurrentDeleteItem(item);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50px"
                                height="50px"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="current"
                                    d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
            {/* <Modal active={deleteModal} setActive={setDeleteModal} style={{ justifyContent: "center", marginTop: "150px"}}>
                <div className={styles.modal}>
                    <h4>Видалити новину?</h4>
                    <div className={styles.content}>
                        <div>
                            <img src={import.meta.env.VITE_BASE_URL_IMG + item.img} alt="#" />
                        </div>
                        <p>{truncateText(item.title, 100)}</p>

                    </div>
                    <div className={styles.btns}>
                        <button onClick={()=>setDeleteModal(false)} className={styles.cancel}>Відмінити</button>
                        <button onClick={()=>handleDelete(item._id)} className={styles.del}>Видалити</button>
                    </div>
                </div>
            </Modal> */}
        </>
    );
};

export default AdminNewsElement;
