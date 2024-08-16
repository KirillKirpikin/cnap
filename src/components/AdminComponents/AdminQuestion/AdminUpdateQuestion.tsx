import Spiner from '../../Spiner/Spiner'
import ButtonBack from '../../ButtonBack/ButtonBack'
import SpinerCircle from '../../Spiner/SpinerCircle'
import TransitionPageAdmin from '../../TransitionPage/TransitionPageAdmin'

import {useEffect, useState} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { IQuestion } from '../../../types/question.types'
import { toastError, toastSuccess } from '../../../utils/toastFunction'
import { useGetOneQuestionQuery, useUpdateQuestionMutation } from '../../../store/api/question.api'

import styles from '../add-admin.module.scss'

const AdminUpdateQuestion = () => {
  const {id} = useParams();  
  const navigate = useNavigate();
  const {data, isLoading, isFetching, isSuccess} = useGetOneQuestionQuery(id as string);
  const {register, handleSubmit, formState: {errors}, reset} = useForm<IQuestion>()  
  
  const [updateQuestion] = useUpdateQuestionMutation();
  const [sendIsLoading, setSendIsLoading] = useState(false);

  const onSubmit:SubmitHandler<IQuestion> = (dataForm) =>{
    setSendIsLoading(true)
    const formData = {
        question: dataForm.question,
        link: dataForm.answer,
    }

    updateQuestion({id, formData}).unwrap()
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
          <h3>Оновити Питання відповідь</h3>
          {isLoading ?
            <SpinerCircle/>
            : data ? (
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                  <div className={styles.input}>
                    <p>Введіть Питання</p>
                    <input {...register('question', {
                      required:"Введіть питання",
                      minLength: {
                          value: 5,
                          message: 'Мінимум 5 символів'
                      }
                    })} defaultValue={data.question} type="text" />
                    {errors?.question && <p className={styles.error}>{errors?.question?.message || 'Error!'}</p>}
                  </div>                 
                  <div className={`${styles.input} ${styles.textarea}`}>
                    <p>Введіть Відповідь</p>
                    <textarea {...register('answer', {
                      required:"Введіть відповідь",
                      minLength: {
                        value: 5,
                        message: 'Мінимум 5 символів'
                      }
                    })} defaultValue={data.answer}></textarea>
                    {errors?.answer && <p className={styles.error}>{errors?.answer?.message || 'Error!'}</p>}
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

export default AdminUpdateQuestion