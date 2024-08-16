import ButtonBack from '../../ButtonBack/ButtonBack'
import GpsSvg from '../../../assets/gps.svg'
import PhoneSvg from '../../../assets/phone.svg'
import MailSvg from '../../../assets/mail.svg'
import TimeSvg from '../../../assets/time.svg'
import SpinerCircle from '../../Spiner/SpinerCircle';
import TransitionPageAdmin from '../../TransitionPage/TransitionPageAdmin';
import Spiner from '../../Spiner/Spiner';

import { IContacts } from '../../../types/contacts.types';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toastError, toastSuccess } from '../../../utils/toastFunction';
import {  useGetOneContactsQuery, useUpdateContactsMutation } from '../../../store/api/contacts.api';

import styles from './contacts-add-admin.module.scss';

const AdminUpdateContacts = () => {
    const {id} = useParams();  
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, reset} = useForm<IContacts>()
    const {data, isLoading, isFetching, isSuccess} = useGetOneContactsQuery(id as string)
    
    const [sendIsLoading, setSendIsLoading] = useState(false);
    const [updateContacts] = useUpdateContactsMutation();

    const onSubmit:SubmitHandler<IContacts> = (data) =>{
        setSendIsLoading(true);   
        const formData = {
            title: data.title,
            address: data.address,
            emai: data.emai,
            phone: data.phone,
            schedule: data.schedule,
        }
        updateContacts({id, formData}).unwrap()
        .then((data)=>{
            setSendIsLoading(false)
            toastSuccess(data.message);
            reset()
            navigate(-1);
        })
        .catch((error) => {
            setSendIsLoading(false)
            toastError(error.data.message)
        });
    }

    useEffect(()=>{
        if(!isFetching && !isLoading && !isSuccess){
            navigate(-1);    
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[isLoading, isFetching, isSuccess]);

    return (
        <TransitionPageAdmin>
            <div>
                <ButtonBack/>
                {sendIsLoading && <div className={styles.send}> <div className={styles.spin}><Spiner/></div> </div>}
                <div className={styles.container}>
                    <h3>Оновити Центр послуг</h3>
                    {isLoading ?
                    <SpinerCircle/>
                    : data ? (
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                            <div className={styles.input}>
                                <div className={styles.img}></div>
                                <input {...register('title', {
                                    required:"Введіть назву Цнапу",
                                    minLength: {
                                        value: 5,
                                        message: 'Мінимум 5 символів'
                                    }
                                })} defaultValue={data.title} placeholder='Назва Цнапу' type="text" />
                            </div>          
                            <div className={styles.input}>
                                <div className={styles.img}><img src={`${GpsSvg}`} alt="gpsImage"/></div>
                                <input {...register('address', {
                                    required:"Введіть адресс",
                                    minLength: {
                                        value: 5,
                                        message: 'Мінимум 5 символів'
                                    }
                                })} defaultValue={data.address} type="text" />
                                {errors?.address && <p className={styles.error}>{errors?.address?.message || 'Error!'}</p>}
                            </div>          
                            <p className='inline-block mx-auto text-red-600'>Указивать номер через ' ; ' без +38</p>
                            <div className={styles.input}>
                                <div className={styles.img}><img src={`${PhoneSvg}`} alt="gpsImage"/></div>
                                <input {...register('phone', {
                                    required:"Введіть номер телефону",
                                    minLength: {
                                        value: 5,
                                        message: 'Мінимум 5 символів'
                                    }
                                })} defaultValue={data.phone} type="text" />
                                {errors?.phone && <p className={styles.error}>{errors?.phone?.message || 'Error!'}</p>}
                            </div>          
                            <div className={styles.input}>
                                <div className={styles.img}><img src={`${MailSvg}`} alt="gpsImage"/></div>
                                <input {...register('emai', {
                                    required:"Введіть emai",
                                    minLength: {
                                        value: 5,
                                        message: 'Мінимум 5 символів'
                                    }
                                })} defaultValue={data.emai} type="text" />
                                {errors?.emai && <p className={styles.error}>{errors?.emai?.message || 'Error!'}</p>}
                            </div>          
                            <div className={styles.input}>
                                <div className={styles.img}><img src={`${TimeSvg}`} alt="gpsImage"/></div>
                                <input {...register('schedule', {
                                    required:"Введіть розклад",
                                    minLength: {
                                        value: 5,
                                        message: 'Мінимум 5 символів'
                                    }
                                })} defaultValue={data.schedule} type="text" />
                                {errors?.schedule && <p className={styles.error}>{errors?.schedule?.message || 'Error!'}</p>}
                            </div>          
                            <div className={styles.btns}>                
                                <button className={styles.btn}>Створити</button>
                            </div>
                        </form>

                    ): <div>Не знайдено</div>
                }
                </div>
            </div>
        </TransitionPageAdmin>
    )
}

export default AdminUpdateContacts;