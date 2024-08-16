import { RefObject, useRef } from 'react'
import ArrowPng from '../../assets/arrow.png'

import styles from './accardion.module.scss'
import { IQuestion } from '../../types/question.types'

interface IAcardion{
    item: IQuestion,
    isOpen: boolean,
    onClick: ()=>void
}
const Accordion = ({item, isOpen, onClick}: IAcardion) => {
    const itemRef: RefObject<HTMLDivElement> = useRef(null);
    return ( 
        <div className={styles.item} key={item._id}>
            <div className={styles.header} onClick={()=>onClick()}>
                <p>{item.question}</p>
                <img className={`${styles.arrow} ${isOpen ? styles.arrow_active : ""}`} src={ArrowPng} alt="arrow" />
            </div>
            <div className={styles.collapse} style={isOpen ? {height: itemRef.current?.scrollHeight} : {height: '0px'}}>
                <div className={styles.body} ref={itemRef}>{item.answer}</div>
            </div>
        </div>
    )
}

export default Accordion;