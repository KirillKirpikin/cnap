/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from 'react-router-dom'
import React, { RefObject, useEffect, useRef, useState } from 'react';
import SpinerCircle from '../Spiner/SpinerCircle';
import TransitionPage from '../TransitionPage/TransitionPage';
import { useGetOneOfflineServQuery } from '../../store/api/offline-serv.api';

import ArrowPng from '../../assets/arrow.png'

import styles from './info-offline-serv.module.scss'
import EntryForm from '../EntryForm';
import TextWithLinks from '../TextWithLinks';

interface IInfoOfflineServProps {
    scrollTo: ()=>void;
}

export const InfoOfflineServ:React.FC<IInfoOfflineServProps> = ({scrollTo}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data, isLoading, isFetching, isSuccess} = useGetOneOfflineServQuery(id as string);    
    const itemRef: RefObject<HTMLDivElement> = useRef(null);

    const [openAccordion, setOpenAccordion] = useState(false);

    useEffect(()=>{
        scrollTo()
    }, [id])

    useEffect(()=>{
        if(!isFetching && !isLoading && !isSuccess){
            navigate('/');    
        } 
    },[isLoading, isFetching, isSuccess])

    return (
        
        <TransitionPage>
            <div className={styles.info}>
                <div className={styles.container}>
                    {isLoading ?
                        <SpinerCircle/>
                        : data ?( 
                            <>
                                <h2>{data.title}</h2>
                                <div className={styles.content}>
                                    <h3>Інформація про послугу</h3>
                                    {data.linkToOnline.length > 0 && 
                                        <div className='w-full'>
                                            <a className={styles.link} href={data.linkToOnline} target='_blank'>Отримати послугу онлайн</a>
                                        </div>                                    
                                    }
                                    <div className={styles.block}>
                                        <h4>Суб’єкт надання</h4>                                       
                                        <pre>
                                            {data.subject}
                                        </pre>                                        
                                    </div>
                                    <div className={styles.block}>
                                        <h4>Вартість</h4>
                                        <p>{data.cost}</p>
                                    </div>
                                    <div className={styles.block}>
                                        <h4>Строки надання</h4>
                                        <p>{data.dedline}</p>
                                    </div>


                                    <div className={styles.accardion}>                                        
                                        <div className={styles.collapse} style={openAccordion ? {height: itemRef.current?.scrollHeight} : {height: '0px'}}>
                                            <div className={styles.body} ref={itemRef}>
                                                <div className={styles.block}>
                                                    <h4>Необхідні документи для отримання послуги</h4>
                                                    <pre>
                                                        <TextWithLinks text={data.documents}/>
                                                    </pre>
                                                </div>
                                                <div className={styles.block}>
                                                    <h4>Нормативні акти</h4>
                                                    <pre>
                                                        <TextWithLinks text={data.acts}/>
                                                    </pre>
                                                </div>
                                                <div className={styles.block}>
                                                    <h4>Спосіб подання</h4>
                                                    <pre>
                                                        {data.method}
                                                    </pre>
                                                </div>
                                                <div className={styles.block}>
                                                    <h4>Результат та спосіб отримання</h4>
                                                    <pre>
                                                        {data.result}
                                                    </pre>
                                                </div>
                                                <div className={styles.block}>
                                                    <h4>Спосіб отримання</h4>
                                                    <pre>
                                                        {data.methodOfObtaining}                                                        
                                                    </pre>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.header} onClick={()=>setOpenAccordion(!openAccordion)}>
                                            <p>{openAccordion ? 'Менше' : 'Детальніше'} про послугу</p>
                                            <img className={`${styles.arrow} ${openAccordion ? styles.arrow_active : ""}`} src={ArrowPng} alt="arrow" />
                                        </div>
                                    </div>
                                   
                                </div>
                                <EntryForm data={data}/>
                            </>  
                        ) : <div>Not Found</div>  
                    }           
                </div>
            </div>

        </TransitionPage>
       
    )
}
