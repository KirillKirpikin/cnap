import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useTypedRedux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/user/userSlice";
import { IAuth } from "../../types/types";
import { Flip, toast } from "react-toastify";

import styles from "./auth.module.scss";
import { useState } from "react";
import EyeOpenSvg from "../../assets/eye-open";
import EyeCloseSvg from "../../assets/eye-close";

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IAuth>();

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const onSubmit: SubmitHandler<IAuth> = (data) => {
        const payload = {
            email: data.email,
            password: data.password,
        };
        dispatch(loginUser(payload))
            .unwrap()
            .then(() => navigate("/admin"))
            .catch((err) => {
                toast.error(`${err.response.data.message}`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Flip,
                });
            });
    };
    return (
        <section className={styles.auth}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <h2>Вхід</h2>
                    <div className={styles.input}>
                        <input
                            {...register("email", {
                                required: "Введіть email",
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message:
                                        "email повиненн бути наприклад example@gmail.com",
                                },
                            })}
                            placeholder="Email"
                        />
                        {errors?.email && (
                            <p className={styles.error}>
                                {errors?.email?.message || "Error!"}
                            </p>
                        )}
                    </div>
                    <div className={styles.input}>
                        <input
                            {...register("password", {
                                required: "Введіть пароль",
                                minLength: {
                                    value: 5,
                                    message: "Мінимум 5 символів",
                                },
                            })}
                            placeholder="Пароль"
                            type={isVisible ? "text" : "password"}
                        />
                        {errors?.password && (
                            <p className={styles.error}>
                                {errors?.password?.message || "Error!"}
                            </p>
                        )}
                        <button
                            type="button"
                            onClick={() => setIsVisible(!isVisible)}
                            className={styles.password}
                        >
                            {isVisible ? <EyeOpenSvg /> : <EyeCloseSvg />}
                        </button>
                    </div>
                    <div className={styles.btns}>
                        <div className={styles.btn}>
                            <button type="submit">Вхід</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Auth;
