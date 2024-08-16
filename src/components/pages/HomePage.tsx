import { AnimatePresence } from "framer-motion";
import { lazy, useEffect, useRef } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import OfflineService from "../OfflineService/OfflineService";
import OnlineService from "../OnlineService/OnlineService";
import Partners from "../Partners";
const News = lazy(()=>import('../News/News'));
const Chat = lazy(()=>import('../Chat/Chat'));
const QuestionsAndAnswers = lazy(()=>import('../QuestionsAndAnswers/QuestionsAndAnswers'));
const Contacts = lazy(()=>import('../Contacts/Contacts'));

const HomePage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const questionRef = useRef<HTMLDivElement>(null);
    const contactsRef = useRef<HTMLDivElement>(null);
    const newsRef = useRef<HTMLDivElement>(null);

    const scrollTo = (ref: React.RefObject<HTMLDivElement>) =>{
        if(ref && ref.current){
            ref.current.scrollIntoView({ behavior: 'smooth'})
        }
    }
    
    useEffect(()=>{
        if(location.pathname === '/'){
            navigate('/online')
        }
    }, [navigate, location])
    return (
        <>
            <Layout 
                scrollTo={scrollTo}
                questionRef={questionRef}
                contactsRef={contactsRef}
                newsRef={newsRef}
            />
            <AnimatePresence >
                <Routes>
                    <Route path='online/*' element = {<OnlineService/>}/>
                    <Route path='offline/*' element={<OfflineService/>}/>
                </Routes>
            </AnimatePresence>
            <div ref={questionRef}>
                    <QuestionsAndAnswers/>
            </div>
            <div ref={contactsRef}>
                    <Contacts/>
            </div>
            <div ref={newsRef}>
                    <News/>
            </div>
            <Chat/>
            <Partners/>
        </>


    )
    
}

export default HomePage