import {
    useDeleteNewsMutation,
    useGetAllNewsQuery,
} from "../../../store/api/news.api";
import PlusSvg from "../../../assets/plus.svg";
import AdminNewsElement from "./AdminNewsElement";
import { Link } from "react-router-dom";
import styles from "./news-admin-element.module.scss";
import SpinerCircle from "../../Spiner/SpinerCircle";
import TransitionPageAdmin from "../../TransitionPage/TransitionPageAdmin";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { toastError, toastSuccess } from "../../../utils/toastFunction";
import { INews } from "../../../types/news.types";
import { truncateText } from "../../../utils/truncateText";

const AdminNews = () => {
    const { data, isLoading } = useGetAllNewsQuery(null);

    const [deleteModal, setDeleteModal] = useState(false);
    const [currentDeleteItem, setCurrentDeleteItem] = useState<INews | null>(
        null
    );
    const [sendIsLoading, setSendIsLoading] = useState(false);

    const [deleteNews] = useDeleteNewsMutation();

    const handleDelete = async (id: string) => {
        setSendIsLoading(true);
        await deleteNews(id)
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
                <div className="py-[15px]">
                    <h2>Новини</h2>
                    <div className="grid items-stretch sm:grid-cols-1 lg:grid-cols-2 gap-[25px] sm:gap-[50px] xl:gap-[75px] px-[10px] md:px-[30px]">
                        {isLoading ? (
                            <SpinerCircle />
                        ) : data && data.length > 0 ? (
                            data.map((item) => (
                                <AdminNewsElement
                                    key={item._id}
                                    setCurrentDeleteItem={setCurrentDeleteItem}
                                    item={item}
                                    sendIsLoading={sendIsLoading}
                                    setDeleteModal={setDeleteModal}
                                />
                            ))
                        ) : (
                            <div>Not Found</div>
                        )}
                        <Link to={"add"} className={styles.add}>
                            <img src={`${PlusSvg}`} alt="plus" />
                            <p className="ml-[-5px]">Додати новину</p>
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
                    <h4>Видалити новину?</h4>
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
                                <p>
                                    {truncateText(currentDeleteItem.title, 100)}
                                </p>
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

export default AdminNews;
