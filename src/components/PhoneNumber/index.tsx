import React, { useMemo } from 'react'
import styles from './phone.module.scss'

interface PhoneNumberProps{
    number: string
}
const PhoneNumber:React.FC<PhoneNumberProps> = ({number}) => {
    const numberArr = useMemo(()=> number.split(';'), [number])

    return (
    <div className='flex flex-col'>
        {
            numberArr.map((item, i) =>(
                <div  key={i} className={styles.phone}>
                    <a href={`tel:+38${item.replace(/\D/g, "")}`}>
                        {item}
                    </a>                    
                </div>
            ))
        }
    </div>
    )
}

export default PhoneNumber