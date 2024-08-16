/* eslint-disable react-hooks/exhaustive-deps */
import styles from './news.module.scss';
import Slider from '../Slider/Slider';
import { useGetAllNewsQuery } from '../../store/api/news.api';
import SpinerCircle from '../Spiner/SpinerCircle';
import { useEffect } from 'react';


const News = () => {
  const {data, isLoading, refetch} = useGetAllNewsQuery(null)
  const fetchData = async () => {
    await refetch();
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <div className={styles.news}>
        <div className={styles.container}>
            <h2 className='select-none'>Новини</h2>
            {isLoading ? 
                <SpinerCircle/>
                : data && data.length > 0 ? <Slider item={data}/>
                : (<div>Not Found</div>)
            }   
        </div>
    </div>
  )
}

export default News