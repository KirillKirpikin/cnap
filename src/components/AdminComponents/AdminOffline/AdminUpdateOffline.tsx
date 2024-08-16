import ButtonBack from "../../ButtonBack/ButtonBack";
import FileUpload from "../../FileUpload/FileUpload";
import SpinerCircle from "../../Spiner/SpinerCircle";
import TransitionPageAdmin from "../../TransitionPage/TransitionPageAdmin";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
    useGetOneOfflineQuery,
    useUpdateOfflineMutation,
} from "../../../store/api/api";
import { IOfflineCreate } from "../../../types/offline.types";
import { toastError, toastSuccess } from "../../../utils/toastFunction";

import SendLoader from "../../Spiner/SendLoader";
import styles from "../add-admin.module.scss";

const AdminUpdateOffline = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [updateOffline] = useUpdateOfflineMutation();
    const [sendIsLoading, setSendIsLoading] = useState(false);

    const { data, isLoading, isFetching, isSuccess } = useGetOneOfflineQuery(
        id as string
    );
    const { handleSubmit } = useForm<IOfflineCreate>();

    const onSubmit: SubmitHandler<IOfflineCreate> = () => {
        setSendIsLoading(true);
        const formData = new FormData();
        if (selectedFiles.length > 0) {
            formData.append("file", selectedFiles[0]);
        }
        updateOffline({ id, formData })
            .unwrap()
            .then((data) => {
                setSendIsLoading(false);
                toastSuccess(data.message);
                setSelectedFiles([]);
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
                    <h3>Оновити офлайн послугу</h3>
                    {isLoading ? (
                        <SpinerCircle />
                    ) : data ? (
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={styles.form}
                        >
                            <div className={styles.input}>
                                <p>Назва оффлайн послуги:</p>

                                <h4 className="text-[25px]">{data.title}</h4>
                            </div>
                            <div className={styles.old}>
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

export default AdminUpdateOffline;
