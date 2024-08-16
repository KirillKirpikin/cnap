import ButtonBack from "../../ButtonBack/ButtonBack";
import FileUpload from "../../FileUpload/FileUpload";
import SpinerCircle from "../../Spiner/SpinerCircle";
import TransitionPageAdmin from "../../TransitionPage/TransitionPageAdmin";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
    useGetOneNewsQuery,
    useUpdateNewsMutation,
} from "../../../store/api/news.api";
import { INews } from "../../../types/news.types";
import { toastError, toastSuccess } from "../../../utils/toastFunction";

import SendLoader from "../../Spiner/SendLoader";
import styles from "../add-admin.module.scss";

const AdminUpdateNews = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [sendIsLoading, setSendIsLoading] = useState(false);

    const { data, isLoading, isFetching, isSuccess } = useGetOneNewsQuery(
        id as string
    );
    const [updateNews] = useUpdateNewsMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<INews>();

    const onSubmit: SubmitHandler<INews> = (dataForm) => {
        setSendIsLoading(true);
        const formData = new FormData();
        formData.append("title", dataForm.title);
        formData.append("description", dataForm.description);
        formData.append("time", dataForm.time);
        if (selectedFiles.length > 0) {
            formData.append("file", selectedFiles[0]);
        }
        updateNews({ id, formData })
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

    useEffect(() => {
        if (!isFetching && !isLoading && !isSuccess) {
            navigate(-1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, isSuccess]);

    return (
        <TransitionPageAdmin>
            <div>
                <ButtonBack />
                <SendLoader load={sendIsLoading} />
                <div className={styles.container}>
                    <h3>Додати нову новину</h3>
                    {isLoading ? (
                        <SpinerCircle />
                    ) : data ? (
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
                                    defaultValue={data.title}
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
                                    defaultValue={data.time}
                                    type="text"
                                />
                                {errors?.time && (
                                    <p className={styles.error}>
                                        {errors?.time?.message || "Error!"}
                                    </p>
                                )}
                            </div>
                            <div
                                className={`${styles.input} ${styles.textarea}`}
                            >
                                <p>Напишіть опис новини</p>
                                <textarea
                                    {...register("description", {
                                        required: "Введіть опис новини",
                                        minLength: {
                                            value: 5,
                                            message: "Мінимум 5 символів",
                                        },
                                    })}
                                    defaultValue={data.description}
                                ></textarea>
                                {errors?.description && (
                                    <p className={styles.error}>
                                        {errors?.description?.message ||
                                            "Error!"}
                                    </p>
                                )}
                            </div>
                            <div className={styles.old_news}>
                                <p>Поточне зображення:</p>
                                <img
                                    src={
                                        import.meta.env.VITE_BASE_URL_IMG +
                                        data.img
                                    }
                                    alt={data.title}
                                />
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
                                <button className={styles.btn}>Оновити</button>
                            </div>
                        </form>
                    ) : (
                        <div>Не знайдено</div>
                    )}
                </div>
            </div>
        </TransitionPageAdmin>
    );
};

export default AdminUpdateNews;
