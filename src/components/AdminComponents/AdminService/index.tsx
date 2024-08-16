import PlusSvg from "../../../assets/plus.svg";
import { Link, useParams } from "react-router-dom";
import {
    useDeleteServiceMutation,
    useGetAllServiceQuery,
} from "../../../store/api/service.api";

import styles from "./service-info-admin.module.scss";
import AdminServiceElement from "./AdminServiceElement";
import SpinerCircle from "../../Spiner/SpinerCircle";
import TransitionPageAdmin from "../../TransitionPage/TransitionPageAdmin";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { toastError, toastSuccess } from "../../../utils/toastFunction";
import { IService } from "../../../types/service.types";

const AdminService = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetAllServiceQuery(id as string);

    const [deleteService] = useDeleteServiceMutation();
    const [deleteModal, setDeleteModal] = useState(false);
    const [currentDeleteItem, setCurrentDeleteItem] = useState<IService | null>(
        null
    );
    const [sendIsLoading, setSendIsLoading] = useState(false);

    const handleDelete = async (id: string) => {
        setSendIsLoading(true);
        await deleteService(id)
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
                                    <AdminServiceElement
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
                                <div>Not Found</div>
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

export default AdminService;
