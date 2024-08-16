import React, { ReactNode, Dispatch, SetStateAction, useEffect } from 'react'
import styles from './modal.module.scss'

interface IMdaolProps {
    active: boolean,
    setActive:  Dispatch<SetStateAction<boolean>>,
    children: ReactNode,
    style: React.CSSProperties;

}
const ChatModal: React.FC<IMdaolProps> = ({active, setActive, children, style}) => {
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [active]);
  return (
    <div className={`${styles.modal} ${active ? styles.modal__active : ''}`} onClick={()=> setActive(false)}>
        <div className={styles.container} style={style}>
            <div className={styles.content_chat} onClick={(e)=>e.stopPropagation()}>
                {children}
            </div>                
        </div>             
    </div>
  )
}

export default ChatModal;