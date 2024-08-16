/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { useGetAllOfflineServQuery } from "../../store/api/offline-serv.api";
import ButtonService from "../ButtonService/ButtonService";
import { useEffect, useRef, useState } from "react";
import { InfoOfflineServ } from "../InfoOfflineServ/InfoOfflineServ";
import { AnimatePresence, motion } from "framer-motion";

import styles from './info-offline.module.scss';
import SearchInput from "../SearchInput";

const InfoOffline = () => {
    const location = useLocation()
    const [value, setValue] = useState('')
    const {id} = useParams();
    const {data, isLoading, refetch} = useGetAllOfflineServQuery({id: id as string ,searchTerm: value});
    const elem2Ref = useRef<HTMLDivElement>(null)

    const scrollToSecond = () =>{
        if(elem2Ref && elem2Ref.current){
            elem2Ref.current.scrollIntoView({ behavior: 'smooth'})
        }
    }

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
                                <div>
                                <h2>Перелік послуг</h2>
                                <SearchInput setValue={setValue}/>
                                    <div className={styles.content}>
                                        <div className={styles.content_1}>
                                        {data && data.length > 0 ? (
                                            <ul className={styles.list}>
                                                {data.map(item => (
                                                    <ButtonService key={item._id} item={item} isImg={false} num={3}/>
                                                ))}
                                            </ul>       
                                        ) : (<div className="text-[25px] text-center">Послуг не знайдено</div>)
                                        }

                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </motion.div>
                )
            }
            <AnimatePresence mode="wait">
                <Routes key={location.pathname.split('/')[3]} location={location}>        
                    <Route path='/:id' element = {
                        <div ref={elem2Ref}>
                            <InfoOfflineServ scrollTo={scrollToSecond} />
                        </div>
                    }/>
                </Routes>
            </AnimatePresence>        
        </>
    )
}

export default InfoOffline;