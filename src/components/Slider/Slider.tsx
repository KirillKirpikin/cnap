import { useCallback, useRef } from 'react'
import { SLIDER_BUTTON_TYPES } from '../../utils/constants';
import {Swiper, SwiperSlide, SwiperRef} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { INews } from '../../types/news.types';

import styles from './slide.module.scss';
import 'swiper/css';
import { truncateText } from '../../utils/truncateText';
import LazyLoadImage from '../LazyLoadImage';

interface ISliderProps{
    item: INews[]
}

const Slider = ({item}: ISliderProps) => {
    const {PREV, NEXT} = SLIDER_BUTTON_TYPES
    const slederRef = useRef<SwiperRef>(null);
    const handleClick = useCallback((type: string)=>{
        if(!slederRef.current) return;

        const {swiper} = slederRef.current;

        type === NEXT ? swiper.slideNext() : swiper.slidePrev()
    }, [NEXT])

  return (
    <div >
        <Swiper
            style={{zIndex: '0'}}
            ref={slederRef}
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            navigation
            breakpoints={{
                680: {
                slidesPerView: 2,
                spaceBetween: 30,
                },
                768: {
                slidesPerView: 2,
                spaceBetween: 40,
                },
                1001: {
                slidesPerView: 3,
                spaceBetween: 13,
                },
                1170: {
                slidesPerView: 3,
                spaceBetween: 53,
                },
            }}
            modules={[Navigation]}
        >
            {item.map((slide)=>(
                <SwiperSlide key={slide._id} className='select-none'>
                    <Link to={`/news/${slide._id}`} className={styles.slide}>
                        <div className={styles.img}>
                            <LazyLoadImage overImg='pt-[75%]' classs='object-cover absolute w-full top-0 left-0' src={import.meta.env.VITE_BASE_URL_IMG + slide.img} height='300px'/>
                        </div>
                        <div className={styles.body}>
                            <h4>{truncateText(slide.title, 100)}</h4>
                            <p>{slide.time}</p>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>

        <div className={styles.btns}>
            <div className={`${styles.btn} ${styles.btn_left}`} onClick={()=>handleClick(PREV)}>
                 <svg width="62" height="24" viewBox="0 0 62 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="Arrow 4" d="M61.0607 13.0607C61.6465 12.4749 61.6465 11.5251 61.0607 10.9393L51.5147 1.3934C50.9289 0.807611 49.9792 0.807611 49.3934 1.3934C48.8076 1.97919 48.8076 2.92893 49.3934 3.51472L57.8787 12L49.3934 20.4853C48.8076 21.0711 48.8076 22.0208 49.3934 22.6066C49.9792 23.1924 50.9289 23.1924 51.5147 22.6066L61.0607 13.0607ZM0 13.5H60V10.5H0V13.5Z" fill="current"/>
                </svg>
            </div>
            <Link to='/news' className='select-none'>Всі новини</Link>
            <div className={`${styles.btn} ${styles.btn_right}`} onClick={()=>handleClick(NEXT)}>
                <svg width="62" height="24" viewBox="0 0 62 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="Arrow 4" d="M61.0607 13.0607C61.6465 12.4749 61.6465 11.5251 61.0607 10.9393L51.5147 1.3934C50.9289 0.807611 49.9792 0.807611 49.3934 1.3934C48.8076 1.97919 48.8076 2.92893 49.3934 3.51472L57.8787 12L49.3934 20.4853C48.8076 21.0711 48.8076 22.0208 49.3934 22.6066C49.9792 23.1924 50.9289 23.1924 51.5147 22.6066L61.0607 13.0607ZM0 13.5H60V10.5H0V13.5Z" fill="current"/>
                </svg>
            </div>
        </div>
    </div>
  )
}

export default Slider