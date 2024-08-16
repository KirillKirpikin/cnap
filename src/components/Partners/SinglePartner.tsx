import React from 'react'
import { IDataPartners } from '../../utils/dataPartners'

import styles from './partners.module.scss'

interface ISingle {
    item: IDataPartners
}

const SinglePartner:React.FC<ISingle> = ({item}) => {
  return (

    <a target='_blank' href={item.link} className={styles.link}>
        <div className={styles.img}>
            <img src={`/partners/${item.img}`} alt={item.title} />
        </div>
        <p>
            {item.title}
        </p>
    </a>

  )
}

export default SinglePartner