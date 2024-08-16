import {
    useDeleteContactsMutation,
    useGetAllContactsQuery,
} from "../../../store/api/contacts.api";
import { Link } from "react-router-dom";
import AdminContactsBtns from "./AdminContactsBtns";
import AdminContactsElement from "./AdminContactsElement";

import styles from "./contacts-admin.module.scss";
import SpinerCircle from "../../Spiner/SpinerCircle";
import TransitionPageAdmin from "../../TransitionPage/TransitionPageAdmin";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { toastError, toastSuccess } from "../../../utils/toastFunction";
import { IContacts } from "../../../types/contacts.types";

const AdminContacts = () => {
    const { isLoading, data } = useGetAllContactsQuery(null);

    const [deleteModal, setDeleteModal] = useState(false);
    const [currentDeleteItem, setCurrentDeleteItem] =
        useState<IContacts | null>(null);

    const [deleteQuestion] = useDeleteContactsMutation();
    const [sendIsLoading, setSendIsLoading] = useState(false);

    const handleDelete = async (id: string) => {
        setSendIsLoading(true);
        await deleteQuestion(id)
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
                <div className={styles.contacts}>
                    <h2>Центри послуги</h2>
                    <div className={styles.btns}>
                        {isLoading ? (
                            <SpinerCircle />
                        ) : data && data.length > 0 ? (
                            data.map((serv) => (
                                <div className={styles.one} key={serv._id}>
                                    <AdminContactsElement item={serv} />
                                    <AdminContactsBtns
                                        item={serv}
                                        setCurrentDeleteItem={
                                            setCurrentDeleteItem
                                        }
                                        setDeleteModal={setDeleteModal}
                                        sendIsLoading={sendIsLoading}
                                    />
                                </div>
                            ))
                        ) : (
                            <div>Not Found</div>
                        )}
                        <Link to={"add"} className={styles.add}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25px"
                                height="25px"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="current"
                                    d="M468.433 210.554H301.446V43.567c0-17.164-13.914-31.079-31.079-31.079h-28.735c-17.164 0-31.079 13.914-31.079 31.079v166.987H43.567c-17.164 0-31.079 13.914-31.079 31.079v28.735c0 17.164 13.914 31.079 31.079 31.079h166.987v166.987c0 17.164 13.914 31.079 31.079 31.079h28.735c17.164 0 31.079-13.914 31.079-31.079V301.446h166.987c17.164 0 31.079-13.914 31.079-31.079v-28.735c-.001-17.164-13.916-31.078-31.08-31.078"
                                />
                            </svg>
                            <p className="ml-[-5px]">Додати послугу</p>
                        </Link>
                    </div>
                </div>
            </TransitionPageAdmin>
            <Modal
                active={deleteModal}
                setActive={setDeleteModal}
                style={{ justifyContent: "center", marginTop: "150px" }}
            >
                <div className={styles.modal}>
                    <h4>Видалити Центр послуг?</h4>
                    {currentDeleteItem && (
                        <>
                            <div className={styles.content}>
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

export default AdminContacts;
