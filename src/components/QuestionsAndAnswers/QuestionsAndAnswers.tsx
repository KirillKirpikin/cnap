/* eslint-disable react-hooks/exhaustive-deps */
import NotFound from '../NotFound'
import Spiner from '../Spiner/Spiner'
import Accordion from '../Accordion/Accordion'

import { useEffect, useState } from 'react'
import { useGetAllQuestionQuery } from '../../store/api/question.api'

import styles from './question.module.scss'

const QuestionsAndAnswers = () => {
    const [openId, setOpenId] = useState<string | null>(null);
    const {data, isLoading, refetch} = useGetAllQuestionQuery(null);

    const fetchData = async () => {
        await refetch();
    };
    
    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 50000);
        return () => clearInterval(intervalId);
    }, [refetch]);
    return (
        <div className={styles.question}>
            <div className={styles.container}>
                <h2>Питання-відповіді</h2>
                {isLoading ? 
                    <Spiner/>
                    : data && data.length > 0 ? (
                        data.map(item => (
                            <Accordion 
                                key={item._id} 
                                item={item} 
                                isOpen={item._id === openId}
                                onClick={()=>(item._id === openId ? setOpenId(null) : setOpenId(item._id))}
                            />
                        )) 
                    ) : (<NotFound/>)
                }            
            </div>
        </div>
    )
}

export default QuestionsAndAnswers