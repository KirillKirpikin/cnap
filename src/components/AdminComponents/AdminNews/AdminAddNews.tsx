import ButtonBack from "../../ButtonBack/ButtonBack";
import FileUpload from "../../FileUpload/FileUpload";
import TransitionPageAdmin from "../../TransitionPage/TransitionPageAdmin";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateNewsMutation } from "../../../store/api/news.api";
import { INews } from "../../../types/news.types";
import {
    toastError,
    toastSuccess,
    toastWarn,
} from "../../../utils/toastFunction";

import SendLoader from "../../Spiner/SendLoader";
import styles from "../add-admin.module.scss";

const AdminAddNews = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<INews>();

    const [createNews] = useCreateNewsMutation();
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [sendIsLoading, setSendIsLoading] = useState(false);

    const onSubmit: SubmitHandler<INews> = (data) => {
        if (selectedFiles.length < 1) {
            toastWarn("Додайте фотографію новини");
        }
        setSendIsLoading(true);
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("time", data.time);
        formData.append("file", selectedFiles[0]);
        createNews(formData)
            .unwrap()
            .then((data) => {
                setSendIsLoading(false);
                toastSuccess(data.message);
                setSelectedFiles([]);
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
                    <h3>Додати нову новину</h3>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles.form}
                    >
                        <div className={styles.input}>
                            <p>Напишіть заголовок</p>
                            <input
                                {...register("title", {
                                    required: "Введіть заголовок",
                                    minLength: {
                                        value: 5,
                                        message: "Мінимум 5 символів",
                                    },
                                })}
                                type="text"
                            />
                            {errors?.title && (
                                <p className={styles.error}>
                                    {errors?.title?.message || "Error!"}
                                </p>
                            )}
                        </div>
                        <div className={styles.input}>
                            <p>Напишіть дату</p>
                            <input
                                {...register("time", {
                                    required: "Введіть дату",
                                    minLength: {
                                        value: 3,
                                        message: "Мінимум 3 символів",
                                    },
                                })}
                                type="text"
                            />
                            {errors?.time && (
                                <p className={styles.error}>
                                    {errors?.time?.message || "Error!"}
                                </p>
                            )}
                        </div>
                        <div className={`${styles.input} ${styles.textarea}`}>
                            <p>Напишіть опис новини</p>
                            <textarea
                                {...register("description", {
                                    required: "Введіть опис новини",
                                    minLength: {
                                        value: 5,
                                        message: "Мінимум 5 символів",
                                    },
                                })}
                            ></textarea>
                            {errors?.description && (
                                <p className={styles.error}>
                                    {errors?.description?.message || "Error!"}
                                </p>
                            )}
                        </div>
                        <div className={styles.btns}>
                            <div className="md:flex items-center max-md:mb-[30px] justify-start">
                                <FileUpload
                                    selectedFiles={selectedFiles}
                                    setSelectedFiles={setSelectedFiles}
                                    quantity={1}
                                />
                                <p className="text-[12px] md:w-[45%] max-md:mt-[20px] md:max-w-[225px]  md:text-[13px] font-normal tracking-tight ml-[10px]">
                                    *формат іконки має бути в SVG, розмір не
                                    біше ніж 44х44
                                </p>
                            </div>
                            <button className={styles.btn}>Створити</button>
                        </div>
                    </form>
                </div>
            </div>
        </TransitionPageAdmin>
    );
};

export default AdminAddNews;
