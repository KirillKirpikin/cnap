import React, { ReactNode, Dispatch, SetStateAction } from 'react'
import styles from './modal.module.scss'

interface IMdaolProps {
    active: boolean,
    setActive:  Dispatch<SetStateAction<boolean>>,
    children: ReactNode,
    style?: React.CSSProperties;

}
const Modal: React.FC<IMdaolProps> = ({active, setActive, children, style}) => {
  return (
    <div className={`${styles.modal} ${active ? styles.modal__active : ''}`} onClick={()=> setActive(false)}>
        <div className={styles.container} style={style}>
            <div className={styles.content} onClick={(e)=>e.stopPropagation()}>
                {children}
            </div>                
        </div>             
    </div>
  )
}

export default Modal