import { Link, Route, Routes, useLocation } from "react-router-dom";
import PlusSvg from "../../../assets/plus.svg";
import {
    useDeleteOnlineMutation,
    useGetAllOnlineQuery,
} from "../../../store/api/online.api";
import AdminOnlineElement from "./AdminOnlineElement";
import AdminService from "../AdminService";
import SpinerCircle from "../../Spiner/SpinerCircle";
import TransitionPageAdmin from "../../TransitionPage/TransitionPageAdmin";
import { AnimatePresence } from "framer-motion";

import styles from "../compontnts-admin.module.scss";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { toastError, toastSuccess } from "../../../utils/toastFunction";
import { IOnline } from "../../../types/online.types";

const AdminOnline = () => {
    const { isLoading, data } = useGetAllOnlineQuery(null);
    const location = useLocation();

    const [deleteModal, setDeleteModal] = useState(false);
    const [currentDeleteItem, setCurrentDeleteItem] = useState<IOnline | null>(
        null
    );
    const [deleteOnline] = useDeleteOnlineMutation();
    const [sendIsLoading, setSendIsLoading] = useState(false);

    const handleDelete = async (id: string) => {
        setSendIsLoading(true);
        await deleteOnline(id)
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
                        <h2>Онлайн послуги</h2>
                        <div className={styles.btns}>
                            {isLoading ? (
                                <SpinerCircle />
                            ) : data && data.length > 0 ? (
                                data.map((serv) => (
                                    <AdminOnlineElement
                                        key={serv._id}
                                        item={serv}
                                        sendIsLoading={sendIsLoading}
                                        setDeleteModal={setDeleteModal}
                                        setCurrentDeleteItem={
                                            setCurrentDeleteItem
                                        }
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
                </div>
            </TransitionPageAdmin>
            <AnimatePresence mode="wait">
                <Routes
                    key={location.pathname.split("/")[3]}
                    location={location}
                >
                    <Route path="/:id" element={<AdminService />} />
                </Routes>
            </AnimatePresence>
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
                                <div>
                                    <img
                                        src={
                                            import.meta.env.VITE_BASE_URL_IMG +
                                            currentDeleteItem.img
                                        }
                                        alt="#"
                                    />
                                </div>
                                <p>{currentDeleteItem.title}</p>
                            </div>
                            <div className={styles.btns}>
                                <button
                                    onClick={() => setDeleteModal(false)}
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

export default AdminOnline;
