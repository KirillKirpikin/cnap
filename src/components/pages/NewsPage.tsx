/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import ButtonBack from '../ButtonBack/ButtonBack';
import { useGetAllNewsQuery } from '../../store/api/news.api';
import Spiner from '../Spiner/Spiner';
import { truncateText } from '../../utils/truncateText';
import { AnimatePresence, motion } from 'framer-motion';
import LazyLoadImage from '../LazyLoadImage';
import { useEffect } from 'react';
import NotFound from '../NotFound';

import styles from '../News/news-page.module.scss';

const NewsPage = () => {
    const {data, isLoading, refetch} = useGetAllNewsQuery(null);

    const fetchData = async () => {
        await refetch();
    };
    
    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);
    }, [refetch]);
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
                        <h2>Новини</h2>
                        <div className={styles.list}>
                            {
                                isLoading ? 
                                    <Spiner/>
                                : data && data.length > 0 ? data.map(item=>(
                                    <Link key={item._id} to={`/news/${item._id}`} className={styles.slide}>
                                        <div className={styles.img}>
                                            <LazyLoadImage src={import.meta.env.VITE_BASE_URL_IMG + item.img} height={'200px'}/>
                                        </div>
                                        <div className={styles.body}>
                                            <h4>{truncateText(item.title, 100)}</h4>
                                            <p>{item.time}</p>
                                        </div>
                                    </Link>
                                )) : <NotFound/>
                            }
                        </div>
                    </div>
                </div>
              
          </motion.div>

        </AnimatePresence>
    )
}

export default NewsPage