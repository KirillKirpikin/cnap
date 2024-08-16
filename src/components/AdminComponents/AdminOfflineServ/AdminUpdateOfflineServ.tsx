import ButtonBack from "../../ButtonBack/ButtonBack";
import SpinerCircle from "../../Spiner/SpinerCircle";
import TransitionPageAdmin from "../../TransitionPage/TransitionPageAdmin";

import { SyntheticEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
    useGetOneOfflineServQuery,
    useUpdateOfflineServMutation,
} from "../../../store/api/offline-serv.api";
import { IOfflineServCreate } from "../../../types/offline-serv.types";
import { toastError, toastSuccess } from "../../../utils/toastFunction";
import { ICnapItem } from "./AdminAddOfflineServ";

import SendLoader from "../../Spiner/SendLoader";
import styles from "../add-admin.module.scss";

const AdminUpdateOfflineServ = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isFetching, isSuccess } =
        useGetOneOfflineServQuery(id as string);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IOfflineServCreate>();
    const [updateOfflineServ] = useUpdateOfflineServMutation();
    const [cnap, setCnap] = useState<ICnapItem[]>([]);
    const [sendIsLoading, setSendIsLoading] = useState(false);

    const onSubmit: SubmitHandler<IOfflineServCreate> = (dataForm) => {
        setSendIsLoading(true);
        const formData = new FormData();
        formData.append("subject", dataForm.subject);
        formData.append("cost", dataForm.cost);
        formData.append("dedline", dataForm.dedline);
        formData.append("documents", dataForm.documents);
        formData.append("acts", dataForm.acts);
        formData.append("method", dataForm.method);
        formData.append("result", dataForm.result);
        formData.append("linkToOnline", dataForm.linkToOnline);
        formData.append("methodOfObtaining", dataForm.methodOfObtaining);
        formData.append("cnap", JSON.stringify(cnap));
        updateOfflineServ({ id, formData })
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

    const addCnap = (e: SyntheticEvent) => {
        e.preventDefault();
        setCnap([
            ...cnap,
            {
                serviseCenterName: "",
                serviceCenterGuid: "",
                serviceGuid: "",
                _id: Date.now(),
            },
        ]);
    };

    const removeCnap = (id: number | string) => {
        setCnap(cnap.filter((i) => i._id !== id));
    };

    const changeCnap = (key: string, value: string, id: string | number) => {
        setCnap(cnap.map((i) => (i._id === id ? { ...i, [key]: value } : i)));
    };

    useEffect(() => {
        if (!isFetching && !isLoading && !isSuccess) {
            navigate(-1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, isSuccess]);

    useEffect(() => {
        if (!isLoading) {
            setCnap(data.cnap);
        }

        // setInStockKgUpdate(item.packing_kg);
    }, [isLoading, data]);

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
                                <p>Назва оффлайн під-послуги:</p>
                                <h4 className="text-[25px] mb-[15px]">
                                    {data.title}
                                </h4>
                            </div>
                            <div className={styles.input}>
                                <p>Суб’єкт надання</p>
                                <textarea
                                    {...register("subject", {
                                        required:
                                            "Введіть інформація про послугу",
                                        minLength: {
                                            value: 5,
                                            message: "Мінимум 5 символів",
                                        },
                                    })}
                                    defaultValue={data.subject}
                                ></textarea>
                                {errors?.subject && (
                                    <p className={styles.error}>
                                        {errors?.subject?.message || "Error!"}
                                    </p>
                                )}
                            </div>
                            <div className={styles.input}>
                                <p>Введіть вартість</p>
                                <input
                                    {...register("cost", {
                                        required: "Введіть вартість",
                                        minLength: {
                                            value: 5,
                                            message: "Мінимум 5 символів",
                                        },
                                    })}
                                    type="text"
                                    defaultValue={data.cost}
                                />
                                {errors?.cost && (
                                    <p className={styles.error}>
                                        {errors?.cost?.message || "Error!"}
                                    </p>
                                )}
                            </div>
                            <div className={styles.input}>
                                <p>
                                    Введіть посилання на онлайн послуг, якщо
                                    нема то лишайте пустим
                                </p>
                                <input
                                    {...register("linkToOnline", {
                                        minLength: {
                                            value: 5,
                                            message: "Мінимум 5 символів",
                                        },
                                    })}
                                    type="text"
                                    defaultValue={data.linkToOnline}
                                />
                                {errors?.linkToOnline && (
                                    <p className={styles.error}>
                                        {errors?.linkToOnline?.message ||
                                            "Error!"}
                                    </p>
                                )}
                            </div>
                            <div className={styles.input}>
                                <p>Введіть строки надання</p>
                                <input
                                    {...register("dedline", {
                                        required: "Введіть строки надання",
                                        minLength: {
                                            value: 5,
                                            message: "Мінимум 5 символів",
                                        },
                                    })}
                                    defaultValue={data.dedline}
                                    type="text"
                                />
                                {errors?.dedline && (
                                    <p className={styles.error}>
                                        {errors?.dedline?.message || "Error!"}
                                    </p>
                                )}
                            </div>
                            <div className={`${styles.input} ${styles.text}`}>
                                <p>Необхідні документи для отримання послуги</p>
                                <textarea
                                    {...register("documents", {
                                        required:
                                            "Необхідні документи для отримання послуги",
                                        minLength: {
                                            value: 5,
                                            message: "Мінимум 5 символів",
                                        },
                                    })}
                                    defaultValue={data.documents}
                                ></textarea>
                                {errors?.documents && (
                                    <p className={styles.error}>
                                        {errors?.documents?.message || "Error!"}
                                    </p>
                                )}
                            </div>
                            <div
                                className={`${styles.input} ${styles.textarea}`}
                            >
                                <p>Нормативні акти</p>
                                <textarea
                                    {...register("acts", {
                                        required: "Введіть ормативні акти",
                                        minLength: {
                                            value: 5,
                                            message: "Мінимум 5 символів",
                                        },
                                    })}
                                    defaultValue={data.acts}
                                ></textarea>
                                {errors?.acts && (
                                    <p className={styles.error}>
                                        {errors?.acts?.message || "Error!"}
                                    </p>
                                )}
                            </div>
                            <div className={styles.input}>
                                <p>Спосіб подання </p>
                                <textarea
                                    {...register("method", {
                                        required: "Введіть спосіб подання ",
                                        minLength: {
                                            value: 5,
                                            message: "Мінимум 5 символів",
                                        },
                                    })}
                                    defaultValue={data.method}
                                ></textarea>
                                {errors?.method && (
                                    <p className={styles.error}>
                                        {errors?.method?.message || "Error!"}
                                    </p>
                                )}
                            </div>
                            <div
                                className={`${styles.input} ${styles.textarea}`}
                            >
                                <p>Результат та спосіб отримання</p>
                                <textarea
                                    {...register("result", {
                                        required:
                                            "Введіть результат та спосіб отримання ",
                                        minLength: {
                                            value: 5,
                                            message: "Мінимум 5 символів",
                                        },
                                    })}
                                    defaultValue={data.result}
                                ></textarea>
                                {errors?.result && (
                                    <p className={styles.error}>
                                        {errors?.result?.message || "Error!"}
                                    </p>
                                )}
                            </div>
                            <div
                                className={`${styles.input} ${styles.textarea}`}
                            >
                                <p>Спосіб отримання</p>
                                <textarea
                                    {...register("methodOfObtaining", {
                                        required: "Введіть спосіб отримання",
                                        minLength: {
                                            value: 5,
                                            message: "Мінимум 5 символів",
                                        },
                                    })}
                                    defaultValue={data.methodOfObtaining}
                                ></textarea>
                                {errors?.methodOfObtaining && (
                                    <p className={styles.error}>
                                        {errors?.methodOfObtaining?.message ||
                                            "Error!"}
                                    </p>
                                )}
                            </div>
                            <div className="mt-[30px]">
                                {cnap.length > 0 &&
                                    cnap.map((item) => (
                                        <div
                                            className={styles.cnap}
                                            key={item._id}
                                        >
                                            <div className={styles.input_cnap}>
                                                <input
                                                    placeholder="Введіть назву Цнапу"
                                                    value={
                                                        item.serviseCenterName
                                                    }
                                                    type="text"
                                                    onChange={(e) =>
                                                        changeCnap(
                                                            "serviseCenterName",
                                                            e.target.value,
                                                            item._id
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className={styles.input_cnap}>
                                                <input
                                                    placeholder="Введите id Cnapa"
                                                    value={
                                                        item.serviceCenterGuid
                                                    }
                                                    type="text"
                                                    onChange={(e) =>
                                                        changeCnap(
                                                            "serviceCenterGuid",
                                                            e.target.value,
                                                            item._id
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className={styles.input_cnap}>
                                                <input
                                                    placeholder="Введите id послуги"
                                                    value={item.serviceGuid}
                                                    type="text"
                                                    onChange={(e) =>
                                                        changeCnap(
                                                            "serviceGuid",
                                                            e.target.value,
                                                            item._id
                                                        )
                                                    }
                                                />
                                            </div>
                                            <button
                                                onClick={() =>
                                                    removeCnap(item._id)
                                                }
                                                className={styles.btn_del}
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    ))}
                                <button
                                    onClick={addCnap}
                                    className={styles.btn}
                                >
                                    Додати ЦНАП
                                </button>
                            </div>

                            <div className={styles.btns}>
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

export default AdminUpdateOfflineServ;
