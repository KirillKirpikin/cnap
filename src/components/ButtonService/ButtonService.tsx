import { Link, useLocation } from "react-router-dom";
import { IOnline } from "../../types/online.types";
import { IOfflineServ } from "../../types/offline-serv.types";

import styles from "./button.module.scss";
import LazyLoadImage from "../LazyLoadImage";

interface IButtonService {
    item: IOnline | IOfflineServ;
    scrollTo?: () => void;
    num: number;
    isImg?: boolean;
}

const ButtonService = ({ item, num, isImg = true }: IButtonService) => {
    const { pathname } = useLocation();
    const isActive = item._id === pathname.split("/")[num];

    return (
        <Link
            className={`${styles.link} ${isActive ? styles.link_active : ""}`}
            to={item._id}
        >
            {isImg && "img" in item && (
                <div className={styles.img}>
                    <LazyLoadImage
                        src={import.meta.env.VITE_BASE_URL_IMG + item.img}
                        w={"45px"}
                        h={"45px"}
                        height={"45px"}
                    />
                    {/* <img src={import.meta.env.VITE_BASE_URL_IMG + item.img} alt={import.meta.env.VITE_BASE_URL_IMG + item.img}/> */}
                </div>
            )}
            <p className={`${isImg === false} ${styles.txt}`}>{item.title}</p>
        </Link>
    );
};

export default ButtonService;
