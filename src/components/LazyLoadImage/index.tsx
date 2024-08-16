import { useState } from 'react'
import { useInView } from 'react-intersection-observer';
import SpinerCircle from '../Spiner/SpinerCircle';

interface IProps {
    src: string,
    w?: string,
    h?: string,
    height?: string,
    classs?:string,
    overImg?: string,
}

const LazyLoadImage = ({src, w, h, height, classs, overImg}: IProps) => {
    const [ref, inView] = useInView({triggerOnce: true});
    const [isLoading, setIsLoading] = useState(true);
    
    const handleImageLoad = () => {
        setIsLoading(false);
    };

  return (
    <div className={isLoading ?  '' : `${overImg ? overImg : ''}`} ref={ref}>
        {isLoading &&  <SpinerCircle w={w} h={h} height={height}/>}
        {inView && <img className={isLoading ? 'hidden' : `${classs ? classs : ''}`}  onLoad={handleImageLoad}  src={src} alt={src} style={{transition: 'transform 0.2s ease-in-out'}}/>}
    </div>
  )
}

export default LazyLoadImage