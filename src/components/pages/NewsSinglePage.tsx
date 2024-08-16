import ButtonBack from '../ButtonBack/ButtonBack';
import LazyLoadImage from '../LazyLoadImage';
import Spiner from '../Spiner/Spiner';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetOneNewsQuery } from '../../store/api/news.api';
import { AnimatePresence, motion } from 'framer-motion';
import NotFound from '../NotFound';

import styles from '../News/news-single.module.scss';

const NewsSinglePage = () => {   
    const {id} = useParams();
    const navigate = useNavigate();
    const {data, isLoading, isFetching, isSuccess} = useGetOneNewsQuery(id as string);

    useEffect(()=>{
        if(!isFetching && !isLoading && !isSuccess){
            navigate('/');    
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoading, isFetching, isSuccess])
    return (
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0, y: 100, overflow: 'hidden'}}
                animate={{ opacity: 1, y: 0, overflow: 'null' }}
                exit={{ opacity: 0, y: -100, overflow: 'hidden' }}
                transition={{duration: 0.5}}
              >
                <div className={styles.news}>
                    <div className={styles.container}>
                        <ButtonBack/>
                        {isLoading ?
                            <Spiner/>
                            : data ?( 
                                <>
                                    <div className={styles.body}>
                                        <div className={styles.img}>
                                            <LazyLoadImage src={import.meta.env.VITE_BASE_URL_IMG + data.img} height={'300px'}/>
                                        </div>
                                        <h2>{data.title}</h2>
                                        <pre>{data.description}</pre>
                                    </div>
                                    <div className={styles.bottom}>
                                        <p>Коли: {data.time}</p>                
                                    </div>
                                </>  
                            ) : <NotFound/> 
                        }
                    </div>        
                </div>

              </motion.div>
        </AnimatePresence>
    )
}

export default NewsSinglePage