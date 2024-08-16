import React, { useEffect, useState } from "react";
import ArrowPng from "../../assets/arrow.png";

import styles from "./select.module.scss";
import { formatDateTime } from "../../utils/formatDateTime";
import { IFetchData } from "../EntryForm";

interface ISelectProps {
    arr: IFetchData;
    firstState: string;

    selected: string | null;
    setSelected: (option: string) => void;
    formate?: boolean;
    handleFetch?: () => Promise<void>;
}

const CustomSelectForArr: React.FC<ISelectProps> = ({
    arr,
    selected,
    setSelected,
    firstState,
    formate,
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
                {formate ? (
                    <span>
                        {selected ? formatDateTime(selected, true) : firstState}
                    </span>
                ) : (
                    <span>{selected ? selected : firstState}</span>
                )}

                <img
                    src={ArrowPng}
                    alt="arrow"
                    className={`${styles.img} ${isActive && styles.img_active}`}
                />
            </div>

            {isActive && (
                <div className={styles.options}>
                    {arr.isSucceeded === true ? (
                        arr.result.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setSelected(option);
                                    handleFetch && handleFetch();
                                    setIsActive(!isActive);
                                }}
                            >
                                {formate
                                    ? formatDateTime(option, true)
                                    : option}
                            </div>
                        ))
                    ) : (
                        <div>немає данних</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomSelectForArr;
