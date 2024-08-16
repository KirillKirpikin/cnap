import {  ChangeEvent, useEffect, useState } from 'react'
import ChatSvg from '../../assets/chat.svg'
import Message from './Message'
import ChatModal from '../Modal/ModalChat'
import MaskedInput from 'react-text-mask'

import styles from './chat.module.scss'


const Chat = () => {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const handleOkClick = () => {
        const isNameValid = validateName(name);
        const isPhoneValid = validatePhoneNumber(phoneNumber);
        if(isNameValid && isPhoneValid) {
            localStorage.setItem('chatName', name);
            localStorage.setItem('chatPhoneNumber', phoneNumber);
            setStep(1);
        } else{
            if (!isNameValid) {
                setNameError('Введіть коректне ім\'я');
              } else {
                setNameError('');
              }
        
              if (!isPhoneValid) {
                setPhoneError('Введіть коректний номер телефону');
              } else {
                setPhoneError('');
              }

        }       
    };

    const validateName = (name:string) => {
        
        return name.length >3;
      };
    
      const validatePhoneNumber = (phoneNumber: string) => {
        return phoneNumber.replace(/[^\d]/g, '').length >= 12;
      };

      const handleInputFocus: React.FocusEventHandler<HTMLInputElement> = () => {
        if(nameError) setNameError('');
        if(phoneError) setPhoneError('');   
      };

    useEffect(() => {
        if (localStorage.getItem('chatName') && localStorage.getItem('chatPhoneNumber')) {
            const locaklName = localStorage.getItem('chatName');
            const lockalPhone = localStorage.getItem('chatPhoneNumber')
            if(locaklName && lockalPhone){
                setName(locaklName);
                setPhoneNumber(lockalPhone);
                setStep(1);
            }
        }
      }, []);
      
    return (
        <>             
            <button onClick={()=>setOpen(true)} className={`${styles.chats} ${open && styles.chats_active}`}>
                <img src={`${ChatSvg}`} alt="chat" />
                <div className={styles.puls}>
                </div>
            </button>          
            
            <ChatModal active={open} setActive={setOpen} style={{ justifyContent: "flex-end"}}>
                <div className={styles.head}>
                    <h4>Чат</h4>
                    <button onClick={()=> setOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 512 512"><path fill="current" d="M468.433 210.554H301.446V43.567c0-17.164-13.914-31.079-31.079-31.079h-28.735c-17.164 0-31.079 13.914-31.079 31.079v166.987H43.567c-17.164 0-31.079 13.914-31.079 31.079v28.735c0 17.164 13.914 31.079 31.079 31.079h166.987v166.987c0 17.164 13.914 31.079 31.079 31.079h28.735c17.164 0 31.079-13.914 31.079-31.079V301.446h166.987c17.164 0 31.079-13.914 31.079-31.079v-28.735c-.001-17.164-13.916-31.078-31.08-31.078"/></svg>
                    </button>
                </div>
                <div className={styles.modal}>
                    <div className={styles.content}>
                        {step === 0 && (
                            <div className={styles.accept}>
                                <div className={styles.input}>
                                    <p>Введіть прізвище та ім’я</p>
                                    <input
                                        type="text"
                                        placeholder="Введіть прізвище та ім’я"
                                        value={name}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                        onFocus={handleInputFocus}
                                    />
                                    {nameError && <p className={styles.error}>{nameError}</p>}
                                </div>
                                <div className={styles.input}>
                                    <p>Введіть номер телефона</p>  
                                    <MaskedInput
                                        mask={[
                                            '+',
                                            '3',
                                            '8',
                                            ' ',
                                            '(',
                                            '0',
                                            /[0-9]/,
                                            /\d/,
                                            ')',
                                            ' ',
                                            /\d/,
                                            /\d/,
                                            /\d/,
                                            '-',
                                            /\d/,
                                            /\d/,
                                            '-',
                                            /\d/,
                                            /\d/,
                                          ]}
                                        // placeholderChar={'\u2000'}
                                        showMask
                                        guide={true}
                                        keepCharPositions
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        onFocus={handleInputFocus}
                                    />
                                    {phoneError && <p className={styles.error}>{phoneError}</p>}                
                                </div>
                                <div className={styles.btn}>
                                    <button onClick={handleOkClick}>Почати чат</button>
                                </div>
                            </div>  
                        )}
                        {step === 1 && (
                            <Message name={name} phoneNumber={phoneNumber}/>
                        )}
                    </div>
                </div>
            </ChatModal>
        </>
    )   
}

export default Chat