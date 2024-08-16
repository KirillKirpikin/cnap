/* eslint-disable react-hooks/exhaustive-deps */
import SpinerCircle from '../Spiner/SpinerCircle';
import ContactItem from '../ContactItem/ContactItem'

import { useEffect } from 'react';
import { useGetAllContactsQuery } from '../../store/api/contacts.api'

import styles from './contacts.module.scss'
import NotFound from '../NotFound';

const Contacts = () => {
    const {data, isLoading, refetch} = useGetAllContactsQuery(null);

    const fetchData = async () => {
        await refetch();
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);
    }, [refetch]);
    

    return (
        <div className={styles.contacts}>
            <div className={styles.container}>
                <h2>Центри послуг</h2>                
                    {isLoading ? 
                        <SpinerCircle/>
                        : data && data.length > 0 ? (                            
                            <ContactItem item={data}/>
                        
                        ) : (<NotFound/>)
                    }  
            </div>

        </div>
    )
}

export default Contacts

