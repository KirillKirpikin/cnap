/* eslint-disable react-hooks/exhaustive-deps */
import NotFound from '../NotFound';
import SpinerCircle from '../Spiner/SpinerCircle';
import InfoOffline from '../InfoOffline/InfoOffline';
import ButtonService from '../ButtonService/ButtonService';
import TransitionPage from '../TransitionPage/TransitionPage';


import { Route, Routes, useLocation } from 'react-router-dom';
import { useGetAllOfflineQuery } from '../../store/api/api';
import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

// const InfoOffline = lazy(()=>import('../InfoOffline/InfoOffline'));
import styles from './offline.module.scss';


const OfflineService = () => {
  const location = useLocation()
  const {isLoading, data, refetch} =  useGetAllOfflineQuery(null);
  const elemRef = useRef<HTMLDivElement>(null)

  const scrollToFirst = () =>{
    if(elemRef && elemRef.current){
      elemRef.current.scrollIntoView({ behavior: 'smooth'})
    }
  }
  const fetchData = async () => {
    await refetch();
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 100000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  useEffect(()=>{
    if(location.pathname.replace("/offline", "").length > 1){
      scrollToFirst();
    }
  }, [location])

  

  return (
    <>
        <div className={styles.offline}>
          <div className={styles.container}>
              {isLoading ?
                <SpinerCircle/>
                : data && data.length > 0 ? (
                  <TransitionPage>
                    <h2>Офлайн-послуги</h2>
                  <div className={styles.btns}>
                   { data.map(item=> (
                      <ButtonService key={item._id} item={item} num={2}/>
                    ))}
                  </div>
                </TransitionPage>
                ) : (<NotFound/>)
              }          
            </div>
        </div>

        <div className='w-full h-[10px]' ref={elemRef}></div>
        <AnimatePresence mode="wait">
          <Routes key={location.pathname.split('/')[2]} location={location}>        
            <Route path='/:id/*' element = { <InfoOffline/>}/>
          </Routes>
        </AnimatePresence>
    </>
  )
}

export default OfflineService

