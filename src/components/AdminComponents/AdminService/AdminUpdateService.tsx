import Spiner from '../../Spiner/Spiner'
import ButtonBack from '../../ButtonBack/ButtonBack'
import SpinerCircle from '../../Spiner/SpinerCircle'
import TransitionPageAdmin from '../../TransitionPage/TransitionPageAdmin'

import {useEffect, useState} from 'react'
import { IService } from '../../../types/service.types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toastError, toastSuccess } from '../../../utils/toastFunction'
import { useGetOneServiceQuery, useUpdateServiceMutation } from '../../../store/api/service.api'

import styles from '../add-admin.module.scss'

const AdminUpdateService = () => {
  const {id} = useParams();  
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}, reset} = useForm<IService>()
  const {data, isLoading, isFetching, isSuccess} = useGetOneServiceQuery(id as string)

  const [updateService] = useUpdateServiceMutation();
  const [sendIsLoading, setSendIsLoading] = useState(false);

  const onSubmit:SubmitHandler<IService> = (dataForm) =>{
    setSendIsLoading(true);  
    const formData = {
        title: dataForm.title,
        link: dataForm.link,
    }

    updateService({id, formData}).unwrap()
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
          <h3>Оновити онлайн послугу</h3>
          {isLoading ?
            <SpinerCircle/>
            : data ? (
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                  <div className={styles.input}>
                    <p>Введіть назву онлайн послуги</p>
                    <input {...register('title', {
                      required:"Введіть назву онлайн посилання",
                      minLength: {
                        value: 5,
                        message: 'Мінимум 5 символів'
                      }
                    })} defaultValue={data.title} type="text" />
                    {errors?.title && <p className={styles.error}>{errors?.title?.message || 'Error!'}</p>}
                  </div>                 
                  <div className={styles.input}>
                    <p>Введіть посилання на онлайн послугу</p>
                    <input {...register('link', {
                      required:"Введіть поссилання",
                      minLength: {
                        value: 5,
                        message: 'Мінимум 5 символів'
                      }
                    })} defaultValue={data.link} type="text" />
                    {errors?.link && <p className={styles.error}>{errors?.link?.message || 'Error!'}</p>}
                  </div>                 
                  <div className={styles.btns}>
                    <button className={styles.btn}>Оновити</button>
                  </div>
                </form>

            ): <div>Не знайдено</div>
          }
        </div>
      </div>
    </TransitionPageAdmin>
  )
}

export default AdminUpdateService