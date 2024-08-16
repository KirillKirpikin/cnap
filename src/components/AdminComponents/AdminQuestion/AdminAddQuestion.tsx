import ButtonBack from "../../ButtonBack/ButtonBack";
import TransitionPageAdmin from "../../TransitionPage/TransitionPageAdmin";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateQuestionMutation } from "../../../store/api/question.api";
import { IQuestion } from "../../../types/question.types";
import { toastError, toastSuccess } from "../../../utils/toastFunction";

import SendLoader from "../../Spiner/SendLoader";
import styles from "../add-admin.module.scss";

const AdminAddQuestion = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IQuestion>();

    const [sendIsLoading, setSendIsLoading] = useState(false);
    const [createQuestion] = useCreateQuestionMutation();

    const onSubmit: SubmitHandler<IQuestion> = (data) => {
        setSendIsLoading(true);
        const formData = {
            question: data.question,
            answer: data.answer,
        };
        createQuestion(formData)
            .unwrap()
            .then((data) => {
                setSendIsLoading(false);
                toastSuccess(data.message);
                reset();
                navigate(-1);
            })
            .catch((error) => {
                setSendIsLoading(false);
                toastError(error.data.message);
            });
    };

    return (
        <TransitionPageAdmin>
            <div>
                <ButtonBack />
                <SendLoader load={sendIsLoading} />
                <div className={styles.container}>
                    <h3>Додати Питання відповідь</h3>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles.form}
                    >
                        <div className={styles.input}>
                            <p>Напишіть питання</p>
                            <input
                                {...register("question", {
                                    required: "Введіть питання",
                                    minLength: {
                                        value: 5,
                                        message: "Мінимум 5 символів",
                                    },
                                })}
                                type="text"
                            />
                            {errors?.question && (
                                <p className={styles.error}>
                                    {errors?.question?.message || "Error!"}
                                </p>
                            )}
                        </div>
                        <div className={`${styles.input} ${styles.textarea}`}>
                            <p>Напишіть відповідь</p>
                            <textarea
                                {...register("answer", {
                                    required: "Введіть відповідь",
                                    minLength: {
                                        value: 5,
                                        message: "Мінимум 5 символів",
                                    },
                                })}
                            ></textarea>
                            {errors?.answer && (
                                <p className={styles.error}>
                                    {errors?.answer?.message || "Error!"}
                                </p>
                            )}
                        </div>
                        <div className={styles.btns}>
                            <button className={styles.btn}>Створити</button>
                        </div>
                    </form>
                </div>
            </div>
        </TransitionPageAdmin>
    );
};

export default AdminAddQuestion;
