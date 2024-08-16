import React, { useEffect, useState } from "react";
import ArrowPng from "../../assets/arrow.png";

import axios, { AxiosResponse } from "axios";
import { formatDateTime } from "../../utils/formatDateTime";
import { ServicebyGroup } from "../AdminComponents/AdminOfflineServ/AdminAddOfflineServ";
import styles from "./select.module.scss";

export interface IResult {
    GroupDescription: string;
}

interface ISelectProps {
    firstState: string;
    url: string;
    GroupDescription?: string;
    selected: string | null;
    setSelected: (option: string) => void;
    formate?: boolean;
    handleFetch?: () => Promise<void>;
    setItem?: React.Dispatch<React.SetStateAction<ServicebyGroup | null>>;
}

const SelectForApi: React.FC<ISelectProps> = ({
    selected,
    setSelected,
    firstState,
    formate,
    handleFetch,
    setItem,
    url,
    GroupDescription,
}) => {
    const [isActive, setIsActive] = useState(false);
    const [arr, setArr] = useState<IResult[] | ServicebyGroup[] | null>(null);

    useEffect(() => {
        if (handleFetch) {
            handleFetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    useEffect(() => {
        axios
            .get(url, {
                params: {
                    organisationGuid: "{A849D636-25EF-439C-A42D-2B3BDA2E365A}",
                    GroupDescription: GroupDescription
                        ? GroupDescription
                        : null,
                },
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((res: AxiosResponse<any, any>) => {
                //     console.log(data?.title)
                //   console.log(res.data)
                setArr(res.data.result);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    {arr && arr.length > 0 ? (
                        arr.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setSelected(
                                        (option as IResult).GroupDescription ||
                                            (option as ServicebyGroup)
                                                .ServiceDescription
                                    );

                                    setItem &&
                                        setItem(option as ServicebyGroup);

                                    handleFetch && handleFetch();
                                    setIsActive(!isActive);
                                }}
                            >
                                {(option as IResult).GroupDescription ||
                                    (option as ServicebyGroup)
                                        .ServiceDescription}
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

export default SelectForApi;
