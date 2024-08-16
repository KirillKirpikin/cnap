import styles from './partners.module.scss'

import { dataPartners } from '../../utils/dataPartners'
import SinglePartner from './SinglePartner';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useDeviceWidth } from '../../hooks/useDeviceWidth';

const Partners = () => {

    const [count, setCount] = useState(4);

    const firstData = dataPartners.slice(0, count);
    const secondData = dataPartners.slice(count);

    const itemRef: RefObject<HTMLDivElement> = useRef(null);

    const [openAccordion, setOpenAccordion] = useState(false);

    const widthDevice = useDeviceWidth();

    useEffect(()=>{
        if(widthDevice > 1280){
            setCount(4);
        } else if(widthDevice > 768 && widthDevice <= 1280 ){
            setCount(3)
        }else if(widthDevice <= 767) {
            setCount(2)
        }  

    }, [widthDevice])

  return (
    <section className={styles.partners}>
        <div className={styles.container}>
            <h2>Наші партнери</h2>
            <ul className={styles.list}>
                {firstData.map((item=>(
                    <SinglePartner key={item.id} item={item}/>
                )))}

            </ul>
            <div className={styles.accardion}>
                <div className={styles.collapse} style={openAccordion ? {height: itemRef.current?.scrollHeight} : {height: '0px'}}>
                    <div className={styles.body} ref={itemRef}>
                        <ul className={styles.list}>
                            {secondData.map((item=>(
                                <SinglePartner key={item.id} item={item}/>
                            )))}                        

                        </ul>
                    </div>
                </div>
                <div className={styles.header} >
                    <button onClick={()=>setOpenAccordion(!openAccordion)}> {openAccordion ? 'Приховати' : 'Всі партнери'}</button>
                </div>
            </div>

        </div>
    </section>
  )
}

export default Partners