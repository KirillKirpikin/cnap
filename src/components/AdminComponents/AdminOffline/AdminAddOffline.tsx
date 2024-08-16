import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateOfflineMutation } from "../../../store/api/api";
import { IOfflineCreate } from "../../../types/offline.types";
import {
    toastError,
    toastSuccess,
    toastWarn,
} from "../../../utils/toastFunction";
import ButtonBack from "../../ButtonBack/ButtonBack";
import FileUpload from "../../FileUpload/FileUpload";
import Spiner from "../../Spiner/Spiner";
import TransitionPageAdmin from "../../TransitionPage/TransitionPageAdmin";

import SelectForApi from "../../CustomSelect/SelectForApi";
import styles from "../add-admin.module.scss";

const AdminAddOffline = () => {
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [sendIsLoading, setSendIsLoading] = useState(false);
    const [createOffline] = useCreateOfflineMutation();
    // const [groupDescription, setGroupDescription] = useState< IGroup| null>(null)

    const [selected, setSelected] = useState<string | null>(null);
    console.log(selected);

    const { handleSubmit } = useForm<IOfflineCreate>();

    const onSubmit: SubmitHandler<IOfflineCreate> = () => {
        if (selectedFiles.length < 1) {
            toastWarn("Додайте іконку");
        }
        setSendIsLoading(true);
        const formData = new FormData();
        if (!selected) {
            return toastWarn("Оберіть назву оффлайн послуги");
        }
        formData.append("title", selected);
        formData.append("file", selectedFiles[0]);
        createOffline(formData)
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
    return (
        <TransitionPageAdmin>
            <div>
                <ButtonBack />
                {sendIsLoading && (
                    <div className={styles.send}>
                        <div className={styles.spin}>
                            <Spiner />
                        </div>
                    </div>
                )}
                <div className={styles.container}>
                    <h3>Додати офлайн послугу</h3>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles.form}
                    >
                        <div className={styles.input}>
                            <p>Оберіть назву оффлайн послуги</p>
                            <SelectForApi
                                selected={selected}
                                setSelected={setSelected}
                                url="https://dniprorada.qsolutions.com.ua:47512/GetGroupList"
                                firstState="Оберіть назву послуги"
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
                            <button className={styles.btn}>Створити</button>
                        </div>
                    </form>
                </div>
            </div>
        </TransitionPageAdmin>
    );
};

export default AdminAddOffline;
