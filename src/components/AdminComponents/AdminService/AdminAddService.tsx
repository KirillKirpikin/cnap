import ButtonBack from "../../ButtonBack/ButtonBack";
import TransitionPageAdmin from "../../TransitionPage/TransitionPageAdmin";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateServiceMutation } from "../../../store/api/service.api";
import { IService } from "../../../types/service.types";
import { toastError, toastSuccess } from "../../../utils/toastFunction";

import SendLoader from "../../Spiner/SendLoader";
import styles from "../add-admin.module.scss";

const AdminAddService = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IService>();

    const [createService] = useCreateServiceMutation();
    const [sendIsLoading, setSendIsLoading] = useState(false);

    const onSubmit: SubmitHandler<IService> = (data) => {
        const formData = {
            title: data.title,
            link: data.link,
            onlineId: params.id,
        };
        createService(formData)
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
                    <h3>Додати онлайн посилання</h3>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles.form}
                    >
                        <div className={styles.input}>
                            <p>Введіть назву онлайн посилання</p>
                            <input
                                {...register("title", {
                                    required: "Введіть назву онлайн посилання",
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
                            <p>Введіть посилання</p>
                            <input
                                {...register("link", {
                                    required: "Введіть посилання",
                                    minLength: {
                                        value: 5,
                                        message: "Мінимум 5 символів",
                                    },
                                })}
                                type="text"
                            />
                            {errors?.link && (
                                <p className={styles.error}>
                                    {errors?.link?.message || "Error!"}
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

export default AdminAddService;
