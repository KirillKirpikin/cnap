import SpinerCircle from '../../Spiner/SpinerCircle';

import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useGetOneOfflineQuery } from '../../../store/api/api';

import styles from './offline-info-admin.module.scss'

export const AdminInfoOffline = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data, isLoading, isFetching, isSuccess} = useGetOneOfflineQuery(id as string);

    useEffect(()=>{
        if(!isFetching && !isLoading && !isSuccess){
            navigate('/');    
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoading, isFetching, isSuccess])
    return (
        <div className={styles.info}>
            <div className={styles.container}>
                {isLoading ?
                    <SpinerCircle/>
                    : data ?( 
                        <>
                            <h2>{data.title}</h2>
                            <div className={styles.content}>
                                <Link to={`/admin/offline/update/${data._id}`}>Редакувати</Link>
                            </div>
                        </>  
                    ) : <div>Not Found</div>  
                }           
            </div>
        </div>
    )
}
