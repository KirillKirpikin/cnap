/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllServiceQuery } from '../../store/api/service.api';

import styles from './info-online.module.scss';


const InfoOnline:React.FC = () => {
    const {id} = useParams();
    const {data, isLoading, refetch} = useGetAllServiceQuery(id as string);

    const fetchData = async () => {
        await refetch();
    };
    
    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);
    }, [refetch]);
    return (
        <>
            {!isLoading && (
                <motion.div
                    initial={{ opacity: 0, height: '0' }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: '0' }}
                    transition={{duration: 0.5}}
                    style={{overflow: 'hidden'}}
                >
                    <div className={styles.info}>
                        <div className={styles.container}>
                            <h2>Перелік послуг</h2>
                            <div className={styles.content}>
                            <div className={styles.content_1}>
                                <ul className={styles.list}>
                                    {data && data.length > 0 ? (
                                        data.map(item => (
                                            <li key={item._id}>
                                                <a  target='_blank' href={item.link}><span>{item.title}</span> </a>
                                            </li>
                                        ))
                                    ) : (<div>Not Found</div>)
                                    }
                                </ul>

                            </div>

                            </div>

                        </div>
                    </div>

                </motion.div>
            )}
        </>
    )
}

export default InfoOnline


