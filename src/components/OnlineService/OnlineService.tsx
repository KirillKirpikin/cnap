/* eslint-disable react-hooks/exhaustive-deps */
import ButtonService from '../ButtonService/ButtonService';
import InfoOnline from '../InfoOnline/InfoOnline';
import NotFound from '../NotFound';
import SpinerCircle from '../Spiner/SpinerCircle';
import TransitionPage from '../TransitionPage/TransitionPage';

import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useGetAllOnlineQuery } from '../../store/api/online.api';

import style from './online.module.scss';

const OnlineService = () => {
  const location = useLocation()
  const {isLoading, data, refetch} = useGetAllOnlineQuery(null);
  const elemRefOnline = useRef<HTMLDivElement>(null)

  const scrollTo = () =>{
    if(elemRefOnline && elemRefOnline.current){
      elemRefOnline.current.scrollIntoView({ behavior: 'smooth'})
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
    if(location.pathname.replace("/online", "").length > 1){
      return scrollTo()
    }
    
  }, [location])


  
 
  

  return (
    <>
      <div className={style.online}>
        <div className={style.container}>
            {isLoading ?
                <SpinerCircle/>
                : data && data.length > 0 ? (
                  <TransitionPage>
                    <h2>Онлайн-послуги</h2>
                    <div className={style.btns}>
                      {data.map((item) => (
                      <ButtonService scrollTo={scrollTo} key={item._id} item={item} num={2}/>
                      ))}
                    </div>
                </TransitionPage>
                ) : (<NotFound/>)
              }   
        </div>   
        <div className='w-full h-[10px]' ref={elemRefOnline}></div> 
      </div>
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route path='/:id' element = {<InfoOnline/>}/>
          </Routes> 
          
        </AnimatePresence>   
      </>
  )
}

export default OnlineService;

