import GpsSvg from "../../../assets/gps.svg";
import MailSvg from "../../../assets/mail.svg";
import PhoneSvg from "../../../assets/phone.svg";
import TimeSvg from "../../../assets/time.svg";
import ButtonBack from "../../ButtonBack/ButtonBack";
import TransitionPageAdmin from "../../TransitionPage/TransitionPageAdmin";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateContactsMutation } from "../../../store/api/contacts.api";
import { IContacts } from "../../../types/contacts.types";
import { toastError, toastSuccess } from "../../../utils/toastFunction";

import SendLoader from "../../Spiner/SendLoader";
import styles from "./contacts-add-admin.module.scss";

const AdminAddContacts = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IContacts>();

    const [createContacts] = useCreateContactsMutation();
    const [sendIsLoading, setSendIsLoading] = useState(false);

    const onSubmit: SubmitHandler<IContacts> = (data) => {
        setSendIsLoading(true);
        const formData = {
            title: data.title,
            address: data.address,
            emai: data.emai,
            phone: data.phone,
            schedule: data.schedule,
        };
        createContacts(formData)
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
                    <h3>Додати центр послуг</h3>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles.form}
                    >
                        <div className={styles.input}>
                            <div className={styles.img}></div>
                            <input
                                {...register("title", {
                                    required: "Введіть назву Цнапу",
                                    minLength: {
                                        value: 5,
                                        message: "Мінимум 5 символів",
                                    },
                                })}
                                placeholder="Назва Цнапу"
                                type="text"
                            />
                            {errors?.title && (
                                <p className={styles.error}>
                                    {errors?.title?.message || "Error!"}
                                </p>
                            )}
                        </div>
                        <div className={styles.input}>
                            <div className={styles.img}>
                                <img src={`${GpsSvg}`} alt="gpsImage" />
                            </div>
                            <input
                                {...register("address", {
                                    required: "Введіть адресс",
                                    minLength: {
                                        value: 5,
                                        message: "Мінимум 5 символів",
                                    },
                                })}
                                type="text"
                            />
                            {errors?.address && (
                                <p className={styles.error}>
                                    {errors?.address?.message || "Error!"}
                                </p>
                            )}
                        </div>
                        <p className="inline-block mx-auto">
                            Указивать номер через ; без +38
                        </p>
                        <div className={styles.input}>
                            <div className={styles.img}>
                                <img src={`${PhoneSvg}`} alt="gpsImage" />
                            </div>
                            <input
                                {...register("phone", {
                                    required: "Введіть номер телефону",
                                    minLength: {
                                        value: 5,
                                        message: "Мінимум 5 символів",
                                    },
                                })}
                                type="text"
                            />
                            {errors?.phone && (
                                <p className={styles.error}>
                                    {errors?.phone?.message || "Error!"}
                                </p>
                            )}
                        </div>
                        <div className={styles.input}>
                            <div className={styles.img}>
                                <img src={`${MailSvg}`} alt="gpsImage" />
                            </div>
                            <input
                                {...register("emai", {
                                    required: "Введіть email",
                                    minLength: {
                                        value: 5,
                                        message: "Мінимум 5 символів",
                                    },
                                })}
                                type="text"
                            />
                            {errors?.emai && (
                                <p className={styles.error}>
                                    {errors?.emai?.message || "Error!"}
                                </p>
                            )}
                        </div>
                        <div className={styles.input}>
                            <div className={styles.img}>
                                <img src={`${TimeSvg}`} alt="gpsImage" />
                            </div>
                            <input
                                {...register("schedule", {
                                    required: "Введіть розклад",
                                    minLength: {
                                        value: 5,
                                        message: "Мінимум 5 символів",
                                    },
                                })}
                                type="text"
                            />
                            {errors?.schedule && (
                                <p className={styles.error}>
                                    {errors?.schedule?.message || "Error!"}
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

export default AdminAddContacts;
