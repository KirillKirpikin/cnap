import React, { useState } from "react";
import styles from "./layout.module.scss";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/useTypedRedux";
import { useGetAllOnlineQuery } from "../../store/api/online.api";
import { useGetAllOfflineQuery } from "../../store/api/api";

interface LayoutProps {
    scrollTo: (ref: React.RefObject<HTMLDivElement>) => void;
    questionRef: React.RefObject<HTMLDivElement>;
    contactsRef: React.RefObject<HTMLDivElement>;
    newsRef: React.RefObject<HTMLDivElement>;
}

const Layout: React.FC<LayoutProps> = ({
    scrollTo,
    questionRef,
    contactsRef,
    newsRef,
}) => {
    const [isHoveredOnline, setIsHoveredOnline] = useState(false);
    const [isHoveredOfline, setIsHoveredOfline] = useState(false);

    const { isAuth, currentUser } = useAppSelector((state) => state.user);
    const setActive = ({ isActive }: { isActive: boolean }) =>
        isActive ? `${styles.btn} ${styles.btn_active}` : styles.btn;
    useGetAllOnlineQuery(null, { skip: !isHoveredOnline });
    useGetAllOfflineQuery(null, { skip: !isHoveredOfline });

    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                <div className={styles.btns}>
                    <NavLink
                        className={setActive}
                        onMouseEnter={() => setIsHoveredOnline(true)}
                        onMouseLeave={() => setIsHoveredOnline(false)}
                        to="online"
                    >
                        Онлайн послуги
                    </NavLink>
                    <NavLink
                        className={setActive}
                        onMouseEnter={() => setIsHoveredOfline(true)}
                        onMouseLeave={() => setIsHoveredOfline(false)}
                        to="offline"
                    >
                        Офлайн послуги
                    </NavLink>
                    <button
                        className={styles.btn}
                        onClick={() => scrollTo(questionRef)}
                    >
                        Питання-відповіді
                    </button>
                    <button
                        className={styles.btn}
                        onClick={() => scrollTo(contactsRef)}
                    >
                        Центри послуг
                    </button>
                    <button
                        className={styles.btn}
                        onClick={() => scrollTo(newsRef)}
                    >
                        Новини
                    </button>
                    {isAuth && currentUser?.role === "ADMIN" && (
                        <Link to="/admin/online" className={styles.btn}>
                            Адмін Панель
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Layout;
