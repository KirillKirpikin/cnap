import React from 'react'
import { ChatMessage, IFile } from '../../types/chat.types'
import { DisplayImageFromArrayBuffer } from '../DisplayImageFromArrayBuffer/DisplayImageFromArrayBuffer'
import { formatDateTime } from '../../utils/formatDateTime'

import styles from './message.module.scss'

interface IMessage {
    message: ChatMessage
}

const MessageMy: React.FC<IMessage> = ({message}) => {
    return (
        <div className={styles.messageMy}>
            <div className={styles.body}>
            <p>{message.username}</p>
            <div className={styles.message}> 
                {message.file && typeof message.file === 'object' ? (
                <DisplayImageFromArrayBuffer
                    fileBuffer={(message.file as IFile)?.file}
                    fileType={(message.file as IFile)?.fileType}
                />
                ) : (
                typeof message.file === 'string' && message.file.length > 0 && (
                    <div className={styles.img}>
                    <img src={import.meta.env.VITE_BASE_URL_IMG + message.file} alt='#' />
                    </div>
                )
                )}                                            
                <p className={styles.text}>
                {message.message}
                </p>
                <p>{formatDateTime(message.created)}</p>
            </div>                    
            </div>
            <span className={styles.icon}>{message.username[0]}</span>                  
        </div>
    )
}

export default MessageMy