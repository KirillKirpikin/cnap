import PlusSvg from "../../../assets/plus.svg";
import SpinerCircle from "../../Spiner/SpinerCircle";
import TransitionPageAdmin from "../../TransitionPage/TransitionPageAdmin";
import AdminOfflineServElement from "./AdminOfflineServElement";

import { Link, useParams } from "react-router-dom";
import {
    useDeleteOfflineServMutation,
    useGetAllOfflineServQuery,
} from "../../../store/api/offline-serv.api";

import styles from "./offline-serv.module.scss";
import { useState } from "react";
import Modal from "../../Modal/Modal";
import { toastError, toastSuccess } from "../../../utils/toastFunction";
import { IOfflineServ } from "../../../types/offline-serv.types";

const AdminOfflineServ = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetAllOfflineServQuery({
        id: id as string,
        searchTerm: "",
    });

    const [deleteModal, setDeleteModal] = useState(false);
    const [currentDeleteItem, setCurrentDeleteItem] =
        useState<IOfflineServ | null>(null);
    const [dleteOffline] = useDeleteOfflineServMutation();
    const [sendIsLoading, setSendIsLoading] = useState(false);

    const handleDelete = async (id: string) => {
        await dleteOffline(id)
            .unwrap()
            .then((data) => {
                setSendIsLoading(false);
                toastSuccess(data.message);
                setDeleteModal(false);
            })
            .catch((error) => {
                setSendIsLoading(false);
                toastError(error.data.message);
            });
    };

    return (
        <>
            <TransitionPageAdmin>
                <div className={styles.info}>
                    <h2>Перелік послуг</h2>
                    <div className={styles.content}>
                        <ul className={styles.list}>
                            {isLoading ? (
                                <SpinerCircle />
                            ) : data && data.length > 0 ? (
                                data.map((item) => (
                                    <AdminOfflineServElement
                                        key={item._id}
                                        item={item}
                                        sendIsLoading={sendIsLoading}
                                        setDeleteModal={setDeleteModal}
                                        setCurrentDeleteItem={
                                            setCurrentDeleteItem
                                        }
                                    />
                                ))
                            ) : (
                                <div className={styles.not}>Немає послуг</div>
                            )}
                            <li className={styles.li}>
                                <Link
                                    to="add"
                                    className={`${styles.btn} ${styles.add}`}
                                >
                                    <img src={`${PlusSvg}`} alt="plus" />
                                    <p className="ml-[-5px]">Додати послугу</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </TransitionPageAdmin>
            <Modal
                active={deleteModal}
                setActive={setDeleteModal}
                style={{ justifyContent: "center", marginTop: "150px" }}
            >
                <div className={styles.modal}>
                    <h4>Видалити послугу?</h4>

                    {currentDeleteItem && (
                        <>
                            <div className={styles.content}>
                                <p>{currentDeleteItem.title}</p>
                            </div>
                            <div className={styles.btns}>
                                <button
                                    onClick={() => {
                                        setDeleteModal(false);
                                    }}
                                    className={styles.cancel}
                                >
                                    Відмінити
                                </button>
                                <button
                                    onClick={() =>
                                        handleDelete(currentDeleteItem._id)
                                    }
                                    className={styles.del}
                                >
                                    Видалити
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default AdminOfflineServ;
