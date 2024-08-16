import React, { useEffect, useState } from "react";
import ArrowPng from "../../assets/arrow.png";

import styles from "./select.module.scss";
import { IOfflineCnapInfo } from "../../types/offline-serv.types";

interface ISelectProps {
    arr: IOfflineCnapInfo[] | null;
    firstState: string;
    selected: IOfflineCnapInfo | null;
    setSelected: (option: IOfflineCnapInfo) => void;
    handleFetch?: () => Promise<void>;
}

const CustomSelect: React.FC<ISelectProps> = ({
    arr = [],
    selected,
    setSelected,
    firstState,
    handleFetch,
}) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (handleFetch) {
            handleFetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    return (
        <div className={styles.select}>
            <div className={styles.main} onClick={() => setIsActive(!isActive)}>
                <span>
                    {selected ? selected.serviseCenterName : firstState}
                </span>
                <img
                    src={ArrowPng}
                    alt="arrow"
                    className={`${styles.img} ${isActive && styles.img_active}`}
                />
            </div>

            {isActive && (
                <div className={styles.options}>
                    {arr &&
                        arr.map((option) => (
                            <div
                                key={option._id}
                                onClick={() => {
                                    setSelected(option);
                                    setIsActive(!isActive);
                                }}
                            >
                                {option.serviseCenterName}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
