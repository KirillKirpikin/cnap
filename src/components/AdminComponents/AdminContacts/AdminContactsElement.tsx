import React from "react"
import { IContacts } from "../../../types/contacts.types";
import GpsSvg from '../../../assets/gps.svg'
import PhoneSvg from '../../../assets/phone.svg'
import MailSvg from '../../../assets/mail.svg'
import TimeSvg from '../../../assets/time.svg'

import styles from './contacts-admin.module.scss'

interface IElementProps {
    item: IContacts;
}

const AdminContactsElement:React.FC<IElementProps> = ({item}) => {
  return (
    <div className={styles.contact}>
        <h3>{item.title}</h3>        
        <div className={styles.block}>
            <div className={styles.img}>
                <img src={`${GpsSvg}`} alt="gpsImage"/>
            </div>
            <p>{item.address}</p>
        </div>
        <div className={styles.block}>
            <div className={styles.img}>
                <img src={`${PhoneSvg}`} alt="phoneImage"/>
            </div>
            <p>
                <a href={`tel:${item.phone}`}>{item.phone}</a>
            </p>
        </div>
        <div className={styles.block}>
            <div className={styles.img}>
                <img src={`${MailSvg}`} alt="mailImage"/>
            </div>
            <p>{item.emai}</p>
        </div>
        <div className={styles.block}>
            <div className={styles.img}>
                <img src={`${TimeSvg}`} alt="scheduleImage"/>
            </div>
            <p>{item.schedule}</p>
        </div>
    </div>
  )
}

export default AdminContactsElement