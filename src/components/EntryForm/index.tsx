import React, { useEffect, useState } from 'react'
import { IOfflineCnapInfo, IOfflineServ } from '../../types/offline-serv.types';

import CustomSelect from '../CustomSelect';
import { IEntryForm } from '../../types/entryForm.types';

import CustomSelectForArr from '../CustomSelect/CustomSelectForArr';
import { Flip, toast } from 'react-toastify';
import Modal from '../Modal/Modal';
import { formatDateTime } from '../../utils/formatDateTime';

import styles from './entry.module.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SpinerCircle from '../Spiner/SpinerCircle';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import { toastError, toastSuccess } from '../../utils/toastFunction';
import Spiner from '../Spiner/Spiner';

interface IEntryFormProps{
    data: IOfflineServ
}
interface IPayload {
    cnap: IOfflineCnapInfo,
    data: IOfflineServ,
    date: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    secondName: string,
    time: string,
}

export interface IFetchData{
    errors: string[],
    isSucceeded: boolean
    result: string[]
}

const EntryForm:React.FC<IEntryFormProps> = ({data}) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<IOfflineCnapInfo | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isLoadingDate, setIsLoadingisLoadingDate] = useState(false); 
    const [isLoadingTime, setIsLoadingisLoadingTime] = useState(false); 
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [sendIsLoading, setSendIsLoading] = useState(false);

    const [preview, setPreview] = useState(false);
    const [payload, setPayload] = useState<IPayload | null>(null)

    const [fetchData, setFetchData] = useState<IFetchData | null >(null);
    const [fetchTime, setFetchTime] = useState<IFetchData | null>(null);


    const {control ,register, handleSubmit, formState: {errors}, reset} = useForm<IEntryForm>()

    const toastRet = (error: string)=>{
        return toast.error(`${error}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
        });
    }

    const onSubmit:SubmitHandler<IEntryForm> = (entryData) =>{
        
        if( selected === null){
            return toastRet('Треба обрати цнап');
        }
        if( selectedDate === null){
            return toastRet('Треба обрати дату');
        }
        if( selectedTime === null){
            return toastRet('Треба обрати час');
        }

        if((entryData.phone.replace(/[^\d]/g, '').length >= 12) === false){            
            return toastRet('Треба ввести номер телефону');
        }
        const payload = {
            ...entryData,
            data:data,
            date: selectedDate.split('T')[0],
            cnap: selected,
            time: selectedTime,
        }
        setPayload(payload)
        setPreview(true)
    }

    const sendReg = async (dataPayload: IPayload) =>{
        setSendIsLoading(true); 
        const reg = {
            organisationGuid: '{a849d636-25ef-439c-a42d-2b3bda2e365a}',
            serviceCenterGuid: selected?.serviceCenterGuid,
            serviceGuid: selected?.serviceGuid,
            name: `${dataPayload.lastName} ${dataPayload.firstName} ${dataPayload.secondName}`,
            date: `${dataPayload.date} ${dataPayload.time}`,
            phone: dataPayload.phone,
            email: dataPayload.email,
            customerInfo: '',
        }
        await axios.get('https://dniprorada.qsolutions.com.ua:47506/Reg', {
            params: reg
        })
            .then((res)=>{
                if(res.data.d && res.data.d.response === 'Reg'){
                    setSendIsLoading(false)
                    reset();
                    navigate(-1);
                    toastSuccess(`Ваш номер запису ${res.data.d.ReceiptNum}`)
                }else {                
                    setSendIsLoading(false)
                    toastError('Вибачте, цей день або час зайнятий, виберіть інший')
                }
            })
            .catch(()=>{
                setSendIsLoading(false)
                toastRet('Вибачте, щось пішло не так')
            })       
    }

    useEffect(()=>{
        setFetchData(null)
        setFetchTime(null)
        setSelectedDate(null)
        setSelectedTime(null)
    }, [selected])
    useEffect(()=>{
        setFetchTime(null)
        setSelectedTime(null)
    }, [selectedDate])
    
    const handleFetchData = async () => { 
        if (selected) {
            setIsLoadingisLoadingDate(true);       
            axios.get('https://dniprorada.qsolutions.com.ua:47506/GetDayList?', {
                params:{
                    organisationGuid: '{a849d636-25ef-439c-a42d-2b3bda2e365a}',
                    serviceCenterGuid: selected?.serviceCenterGuid,
                    serviceGuid: selected?.serviceGuid
                }
            })
            .then((res)=>{
                setFetchData(res.data);
                setIsLoadingisLoadingDate(false)
            })
            .catch((errors)=>{
                console.log(errors)
                setIsLoadingisLoadingDate(false)
            })            
        }
         
        
    };

    const handlefetchTime = async () => {
        if(selectedDate){
            setIsLoadingisLoadingTime(true)
            axios.get('https://dniprorada.qsolutions.com.ua:47506/GetTimeList?',{
                params:{
                    organisationGuid: '{a849d636-25ef-439c-a42d-2b3bda2e365a}',
                    serviceCenterGuid: selected?.serviceCenterGuid,
                    serviceGuid: selected?.serviceGuid,
                    date: selectedDate?.split('T')[0]
                }
            })
            .then((res)=>{
                setFetchTime(res.data)
                setIsLoadingisLoadingTime(false)
            })
            .catch((errors)=>{
                console.log(errors)
                setIsLoadingisLoadingTime(false)
            })  
        }
    };

    return (
        <>
            <div className={styles.entry}>
            {sendIsLoading && <div className={styles.send}> <div className={styles.spin}><Spiner/></div> </div>}
                <h2 className='mb-[20px]'>Стати в чергу</h2>
                <h4>Заповніть форму</h4>
                <div className={styles.container}>
                    <h2>{data.title}</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-[30px]'>
                            <CustomSelect arr={data.cnap} selected={selected} setSelected={setSelected} firstState='Оберіть ЦНАП' handleFetch={handleFetchData}/>
                        </div>
                        <div className={styles.time}>
                            <div className='w-[48%] sm:w-[45%]'>
                                {!isLoadingDate ? fetchData &&  <CustomSelectForArr arr={fetchData} selected={selectedDate} setSelected={setSelectedDate} firstState='Оберіть дату' formate={true} handleFetch={handlefetchTime}/> : <SpinerCircle h='40px' w='40px'/>}
                            </div>
                            <div className='w-[48%] sm:w-[45%]'>
                                {!isLoadingTime ? selectedDate && fetchTime && <CustomSelectForArr arr={fetchTime} selected={selectedTime} setSelected={setSelectedTime} firstState='Оберіть час' formate={false}/> : <SpinerCircle h='40px' w='40px'/>}
                            </div>
                        </div>
                        <div className={styles.name}>
                            <div className={styles.input}>
                                <input {...register('lastName', {
                                    required:"Прізвище",
                                    minLength: {
                                        value: 5,
                                        message: 'Мінимум 5 символів'
                                    }
                                })} placeholder='Прізвище' type="text" />
                                {errors?.lastName && <p className={styles.error}>{errors?.lastName?.message || 'Error!'}</p>}
                            </div>
                            <div className={styles.input}>
                                <input {...register('firstName', {
                                    required:"Ім’я",
                                    minLength: {
                                        value: 5,
                                        message: 'Мінимум 5 символів'
                                    }
                                })} placeholder='Ім’я' type="text" />
                                {errors?.firstName && <p className={styles.error}>{errors?.firstName?.message || 'Error!'}</p>}
                            </div>
                            <div className={styles.input}>
                                <input {...register('secondName', {
                                    required:"По батькові",
                                    minLength: {
                                        value: 5,
                                        message: 'Мінимум 5 символів'
                                    }
                                })} placeholder='По батькові' type="text" />
                                {errors?.secondName && <p className={styles.error}>{errors?.secondName?.message || 'Error!'}</p>}
                            </div>
                        </div>
                        <div className={styles.email}>
                            <div className={styles.input}>
                                <input {...register('email', {
                                    required:"Email",
                                    minLength: {
                                        value: 5,
                                        message: 'Мінимум 5 символів'
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "email повинен бути example@example.com"
                                      }
                                })} placeholder='Email' type="text" />
                                {errors?.email && <p className={styles.error}>{errors?.email?.message || 'Error!'}</p>}
                            </div>
                            <div className={styles.input}>
                                <Controller
                                    name="phone"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <MaskedInput
                                            {...field}
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
                                            showMask
                                            guide={true}
                                            keepCharPositions
                                            placeholder='Телефон'
                                            type="text"
                                        />
                                    )}
                                />
                                {errors?.phone && <p className={styles.error}>{errors?.phone?.message || 'Error!'}</p>}
                            </div>
                        </div>
                        <p className={styles.info}>Врахуйте, будь ласка, що у випадку запізнення Ваш візит буде скасовано або перенесено!</p>
                        <div className={styles.btn}>
                            <button>Записатись</button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal active={preview} setActive={setPreview} style={{ width:'100%', display:'flex', height:'100%', justifyContent:'center', alignItems:'center'}}>
                <div className={styles.modal}>
                    <h4>Підтвердження про запис на прийом</h4>
                    <div className={styles.content}>
                        { payload && (
                            <>
                                <p><span>Послуга: </span>{payload.data.title}</p>
                                <p><span>ЦНАП: </span>{payload.cnap.serviseCenterName}</p>
                                <p><span>Дата та час: </span>{formatDateTime(payload.date, true)} / {(payload.time)}</p>
                                <p><span>Прізвище: </span>{payload.lastName}</p>
                                <p><span>Ім'я: </span>{payload.firstName}</p>
                                <p><span>По батькові: </span>{payload.secondName}</p>
                                <p><span>Email: </span>{payload.email}</p>
                                <p><span>Телефон: </span>{payload.phone}</p>
                                <div className={styles.btns}>
                                    <button onClick={()=>setPreview(false)} className={styles.cancel}>Повернутись</button>
                                    <button onClick={()=>sendReg(payload)} className={styles.del}>Підтвердити запис</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default EntryForm;


//22AD3C59-1B1A-4332-A3BD-B6D406929FD6 я Ветеран транспорт F72A45A0-759D-48C1-A68F-B6D0A0390070

// 7738CBE9-602D-431D-B9E5-C9672BD6B148 ЦНАП ЛІВОБЕРЕЖНИЙ транспорт 3EC0FF07-355E-4684-B430-1A8E64D3D368



// 0F231E7F-D1B9-4599-801B-E59C102235D3