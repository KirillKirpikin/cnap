/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonBack from "../../ButtonBack/ButtonBack";
import TransitionPageAdmin from "../../TransitionPage/TransitionPageAdmin";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useCreateOfflineServMutation } from "../../../store/api/offline-serv.api";
import { IOfflineServ } from "../../../types/offline-serv.types";
import { toastError, toastSuccess } from "../../../utils/toastFunction";

import axios, { AxiosResponse } from "axios";
import { useGetOneOfflineQuery } from "../../../store/api/api";
import SelectForApi from "../../CustomSelect/SelectForApi";
import SendLoader from "../../Spiner/SendLoader";
import styles from "../add-admin.module.scss";

export interface ICnapItem {
    serviseCenterName: string;
    serviceCenterGuid: string;
    serviceGuid: string;
    _id: number;
}

export interface ServicebyGroup {
    Documents: string[];
    Cost: string;
    Subject: string;
    Period: string;
    Acts: string;
    WayOfProviding: string;
    ResultAndMethodOfObtaining: string;
    MethodOfObtaining: string;
    ServiceDescription: string;
}

const AdminAddOfflineServ = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [createOfflineServ] = useCreateOfflineServMutation();
    const [item, setItem] = useState<ServicebyGroup | null>(null);
    const [sendIsLoading, setSendIsLoading] = useState(false);
    const { data, isLoading, isFetching, isSuccess } = useGetOneOfflineQuery(
        id as string
    );

    const [cnap, setCnap] = useState<ICnapItem[]>([]);

    const [title, setTitle] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IOfflineServ>();

    const onSubmit: SubmitHandler<IOfflineServ> = (data) => {
        setSendIsLoading(true);
        const formData = new FormData();
        if (!title || !item)
            return toastError("Оберіть назву оффлайн під-послуги посилання");
        formData.append("title", title);
        formData.append("subject", item.Subject);
        formData.append("cost", item.Cost);
        formData.append("dedline", item.Period);
        formData.append("documents", item.Documents.join(", "));
        formData.append("acts", item.Acts);
        formData.append("method", item.WayOfProviding);
        formData.append("result", item.ResultAndMethodOfObtaining);
        formData.append("linkToOnline", data.linkToOnline);
        formData.append("methodOfObtaining", item.MethodOfObtaining);
        formData.append("cnap", JSON.stringify(cnap));
        if (id) formData.append("offlineId", id);
        createOfflineServ(formData)
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

    useEffect(() => {
        if (!isFetching && !isLoading && !isSuccess) {
            navigate(-1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, isSuccess]);

    const handleClick = async () => {
        if (title) {
            try {
                const res: AxiosResponse<any> = await axios.get(
                    "https://dniprorada.qsolutions.com.ua:47512/GetSrvCenterListbyGroupandService",
                    {
                        params: {
                            organisationGuid:
                                "{A849D636-25EF-439C-A42D-2B3BDA2E365A}",
                            ServiceDescription: title,
                            GroupDescription: data?.title,
                        },
                    }
                );

                const serviceCenters = res.data.result; // массив {ServiceCenterName: string}[]

                const requests = serviceCenters.map(
                    async (item: { ServiceCenterName: string }) => {
                        const response = await axios.get(
                            "https://dniprorada.qsolutions.com.ua:47512/getSrvCenterandServiceGuid",
                            {
                                params: {
                                    organisationGuid:
                                        "{A849D636-25EF-439C-A42D-2B3BDA2E365A}",
                                    ServiceDescription: title,
                                    ServiceCenterName: item.ServiceCenterName,
                                },
                            }
                        );
                        if (response.data) {
                            return {
                                serviseCenterName: item.ServiceCenterName,
                                serviceCenterGuid:
                                    response.data.result[0].ServiceCenterGuid,
                                serviceGuid:
                                    response.data.result[0].ServiceGuid,
                                _id: uuidv4(),
                            };
                        }
                    }
                );

                const cnapResults = await Promise.all(requests);
                setCnap(cnapResults);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };

    return (
        <TransitionPageAdmin>
            <div>
                <ButtonBack />
                <SendLoader load={sendIsLoading} />
                <div className={styles.container}>
                    <h3>Додати оффлайн під-послугу</h3>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles.form}
                    >
                        <div className={styles.input}>
                            <p>Виберіть назву оффлайн під-послуги посилання</p>

                            {data && (
                                <SelectForApi
                                    selected={title}
                                    GroupDescription={data.title}
                                    url="https://dniprorada.qsolutions.com.ua:47512/GetServiceListbyGroup"
                                    setSelected={setTitle}
                                    handleFetch={handleClick}
                                    firstState="Оберіть назву під-послуги"
                                    setItem={setItem}
                                />
                            )}
                        </div>
                        {item !== null && (
                            <>
                                <div className={styles.input}>
                                    <p>Суб’єкт надання:</p>
                                    <p className={styles.item}>
                                        {item.Subject}
                                    </p>
                                </div>
                                <div className={styles.input}>
                                    <p>Вартість:</p>
                                    <p className={styles.item}>{item.Cost}</p>
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
                                    />
                                    {errors?.linkToOnline && (
                                        <p className={styles.error}>
                                            {errors?.linkToOnline?.message ||
                                                "Error!"}
                                        </p>
                                    )}
                                </div>
                                <div className={styles.input}>
                                    <p>Cтроки надання: </p>
                                    <p className={styles.item}>{item.Period}</p>
                                </div>
                                <div
                                    className={`${styles.input} ${styles.textarea}`}
                                >
                                    <p>Необхідні документи для отримання:</p>
                                    <p className={styles.item}>
                                        {item.Documents.join(", ")}
                                    </p>
                                </div>
                                <div
                                    className={`${styles.input} ${styles.textarea}`}
                                >
                                    <p>Нормативні акти:</p>
                                    <p className={styles.item}>{item.Acts}</p>
                                </div>
                                <div className={styles.input}>
                                    <p>Спосіб подання: </p>
                                    <p className={styles.item}>
                                        {item.WayOfProviding}
                                    </p>
                                </div>
                                <div
                                    className={`${styles.input} ${styles.textarea}`}
                                >
                                    <p>Результат та спосіб отримання:</p>
                                    <p className={styles.item}>
                                        {item.ResultAndMethodOfObtaining}
                                    </p>
                                </div>
                                <div
                                    className={`${styles.input} ${styles.textarea}`}
                                >
                                    <p>Спосіб отримання:</p>
                                    <p className={styles.item}>
                                        {item.MethodOfObtaining}
                                    </p>
                                </div>
                            </>
                        )}
                        <div className={styles.btns}>
                            <button className={styles.btn}>Створити</button>
                        </div>
                    </form>
                </div>
            </div>
        </TransitionPageAdmin>
    );
};

export default AdminAddOfflineServ;
