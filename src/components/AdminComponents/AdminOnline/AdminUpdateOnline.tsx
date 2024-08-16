import Spiner from '../../Spiner/Spiner'
import ButtonBack from '../../ButtonBack/ButtonBack'
import FileUpload from '../../FileUpload/FileUpload'
import SpinerCircle from '../../Spiner/SpinerCircle'
import TransitionPageAdmin from '../../TransitionPage/TransitionPageAdmin'

import {useEffect, useState} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { IOnlineCreate } from '../../../types/online.types'
import { toastError, toastSuccess } from '../../../utils/toastFunction'
import { useGetOneOnlineQuery, useUpdateOnlineMutation } from '../../../store/api/online.api'

import styles from '../add-admin.module.scss'

const AdminUpdateOnline = () => {
  const {id} = useParams();  
  const navigate = useNavigate();
  const {data, isLoading, isFetching, isSuccess} = useGetOneOnlineQuery(id as string)
  const {register, handleSubmit, formState: {errors}, reset} = useForm<IOnlineCreate>()
  
  const [updateOnline] = useUpdateOnlineMutation();
  const [sendIsLoading, setSendIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);


  const onSubmit:SubmitHandler<IOnlineCreate> = (dataForm) =>{
    setSendIsLoading(true);   
    const formData = new FormData();
    formData.append('title', dataForm.title);
    if(selectedFiles.length > 0){
      formData.append('file', selectedFiles[0]);
    }
    updateOnline({id, formData}).unwrap()
      .then((data)=>{
        setSendIsLoading(false)
        toastSuccess(data.message);
        setSelectedFiles([])
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
                      required:"Введіть назву онлайн послуги",
                      minLength: {
                        value: 5,
                        message: 'Мінимум 5 символів'
                      }
                    })} defaultValue={data.title} type="text" />
                    {errors?.title && <p className={styles.error}>{errors?.title?.message || 'Error!'}</p>}  
                  </div>
                  <div className={styles.old}>
                    <p>Поточне зображення:</p>
                    <img src={import.meta.env.VITE_BASE_URL_IMG + data.img} alt={data.title} />
                  </div>
                  <div className={styles.btns}>
                    <div className='md:flex items-center max-md:mb-[30px] justify-start'>
                        <FileUpload selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} quantity={1}/>
                        <p className='text-[12px] md:w-[45%] max-md:mt-[20px] md:max-w-[225px]  md:text-[13px] font-normal tracking-tight ml-[10px]'>*формат іконки має бути в SVG, розмір не біше ніж 44х44</p>
                    </div>
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

export default AdminUpdateOnline