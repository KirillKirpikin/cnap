import PlusSvg from "../../../assets/plus.svg";
import Accordion from "../../Accordion/Accordion";
import AdminQuestionBtns from "./AdminQuestionBtns";
import SpinerCircle from "../../Spiner/SpinerCircle";
import TransitionPageAdmin from "../../TransitionPage/TransitionPageAdmin";

import { useState } from "react";
import {
    useDeleteQuestionMutation,
    useGetAllQuestionQuery,
} from "../../../store/api/question.api";
import { Link } from "react-router-dom";

import Modal from "../../Modal/Modal";
import { toastError, toastSuccess } from "../../../utils/toastFunction";
import { IQuestion } from "../../../types/question.types";

import styles from "./question-admin.module.scss";

const AdminQuestion = () => {
    const [openId, setOpenId] = useState<string | null>(null);
    const { data, isLoading } = useGetAllQuestionQuery(null);

    const [deleteQuestion] = useDeleteQuestionMutation();
    const [deleteModal, setDeleteModal] = useState(false);
    const [currentDeleteItem, setCurrentDeleteItem] =
        useState<IQuestion | null>(null);

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
                <div className="py-[15px] px-[15px]">
                    <h2>Питання-відповіді</h2>
                    {isLoading ? (
                        <SpinerCircle />
                    ) : data && data.length > 0 ? (
                        data.map((item) => (
                            <div key={item._id} className="mb-[20px]">
                                <Accordion
                                    item={item}
                                    isOpen={item._id === openId}
                                    onClick={() =>
                                        item._id === openId
                                            ? setOpenId(null)
                                            : setOpenId(item._id)
                                    }
                                />
                                <AdminQuestionBtns
                                    item={item}
                                    sendIsLoading={sendIsLoading}
                                    setDeleteModal={setDeleteModal}
                                    setCurrentDeleteItem={setCurrentDeleteItem}
                                />
                            </div>
                        ))
                    ) : (
                        <div>Not Found</div>
                    )}
                    <Link className={styles.add} to="add">
                        <img src={`${PlusSvg}`} alt="plus" />
                        <p className="ml-[-5px]">Додати послугу</p>
                    </Link>
                </div>
            </TransitionPageAdmin>
            <Modal
                active={deleteModal}
                setActive={setDeleteModal}
                style={{ justifyContent: "center", marginTop: "150px" }}
            >
                <div className={styles.modal}>
                    <h4>Видалити питання?</h4>
                    {currentDeleteItem && (
                        <>
                            <div className={styles.content}>
                                <p>{currentDeleteItem.question}</p>
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

export default AdminQuestion;
