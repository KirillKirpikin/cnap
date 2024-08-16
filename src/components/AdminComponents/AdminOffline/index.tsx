import PlusSvg from "../../../assets/plus.svg";
import SpinerCircle from "../../Spiner/SpinerCircle";
import AdminOfflineServ from "../AdminOfflineServ";
import AdminOffleneElement from "./AdminOffleneElement";
import TransitionPageAdmin from "../../TransitionPage/TransitionPageAdmin";

import { Link, Route, Routes } from "react-router-dom";
import {
    useDeleteOfflineMutation,
    useGetAllOfflineQuery,
} from "../../../store/api/api";

import styles from "../compontnts-admin.module.scss";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { IOffline } from "../../../types/offline.types";
import { toastError, toastSuccess } from "../../../utils/toastFunction";

const AdminOffline = () => {
    const { isLoading, data } = useGetAllOfflineQuery(null);

    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteItem, setDeletItem] = useState<IOffline | null>(null);
    const [dleteOffline] = useDeleteOfflineMutation();
    const [sendIsLoading, setSendIsLoading] = useState(false);

    const handleDelete = async (id: string) => {
        setSendIsLoading(true);
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
                <div className={styles.compontnts}>
                    <div className={styles.container}>
                        <h2>Офлайн послуги</h2>
                        <div className={styles.btns}>
                            {isLoading ? (
                                <SpinerCircle />
                            ) : data && data.length > 0 ? (
                                data.map((serv) => (
                                    <AdminOffleneElement
                                        key={serv._id}
                                        item={serv}
                                        sendIsLoading={sendIsLoading}
                                        setDeletItem={setDeletItem}
                                        setDeleteModal={setDeleteModal}
                                    />
                                ))
                            ) : (
                                <div>Not Found</div>
                            )}
                            <Link
                                to={"add"}
                                className={`${styles.link} ${styles.add}`}
                            >
                                <img src={`${PlusSvg}`} alt="plus" />
                                <p className="ml-[-5px]">Додати послугу</p>
                            </Link>
                        </div>
                    </div>
                    <Routes>
                        <Route path="/:id" element={<AdminOfflineServ />} />
                    </Routes>
                </div>
            </TransitionPageAdmin>
            <Modal
                active={!!deleteModal}
                setActive={setDeleteModal}
                style={{ justifyContent: "center", marginTop: "150px" }}
            >
                <div className={styles.modal}>
                    <h4>Видалити послугу?</h4>
                    {deleteItem && (
                        <>
                            <div className={styles.content}>
                                <div>
                                    <img
                                        src={
                                            import.meta.env.VITE_BASE_URL_IMG +
                                            deleteItem.img
                                        }
                                        alt="#"
                                    />
                                </div>
                                <p>{deleteItem.title}</p>
                            </div>
                            <div className={styles.btns}>
                                <button
                                    onClick={() => setDeleteModal(false)}
                                    className={styles.cancel}
                                >
                                    Відмінити
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteItem._id)}
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

export default AdminOffline;
