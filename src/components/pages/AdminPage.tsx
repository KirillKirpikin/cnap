import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import AdminLoyaut from "../AdminComponents/AdminLoyaut"
import AdminOnline from "../AdminComponents/AdminOnline"
import AdminOffline from "../AdminComponents/AdminOffline"
import AdminQuestion from "../AdminComponents/AdminQuestion"
import AdminNews from "../AdminComponents/AdminNews"
import AdminChat from "../AdminComponents/AdminChat"
import AdminUpdateOffline from "../AdminComponents/AdminOffline/AdminUpdateOffline"
import AdminAddOffline from "../AdminComponents/AdminOffline/AdminAddOffline"
import AdminAddOnline from "../AdminComponents/AdminOnline/AdminAddOnline"
import AdminUpdateOnline from "../AdminComponents/AdminOnline/AdminUpdateOnline"
import AdminAddService from "../AdminComponents/AdminService/AdminAddService"
import AdminUpdateService from "../AdminComponents/AdminService/AdminUpdateService"
import AdminAddQuestion from "../AdminComponents/AdminQuestion/AdminAddQuestion"
import AdminUpdateQuestion from "../AdminComponents/AdminQuestion/AdminUpdateQuestion"
import AdminContacts from "../AdminComponents/AdminContacts"
import AdminAddContacts from "../AdminComponents/AdminContacts/AdminAddContacts"
import AdminUpdateContacts from "../AdminComponents/AdminContacts/AdminUpdateContacts"
import AdminAddNews from "../AdminComponents/AdminNews/AdminAddNews"
import AdminUpdateNews from "../AdminComponents/AdminNews/AdminUpdateNews"
import styles from '../AdminComponents/admin.module.scss'
import { useAppDispatch } from "../../hooks/useTypedRedux"
import { logOut } from "../../store/user/userSlice"
import { AnimatePresence } from "framer-motion"
import AdminAddOfflineServ from "../AdminComponents/AdminOfflineServ/AdminAddOfflineServ"
import AdminUpdateOfflineServ from "../AdminComponents/AdminOfflineServ/AdminUpdateOfflineServ"

const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation()

  const out = ()=>{
    dispatch(logOut());
    navigate('/')
  }

  return (
    <div className={styles.admin}>
      <div className={styles.container}>
        <div className={styles.out}>
          <button onClick={out}>Вийти</button>
        </div>
        <h2>Кабінет адміністратора</h2>
        <div className={styles.body}>
          <AdminLoyaut/>
          <div className={styles.page}>
            <AnimatePresence mode="wait">
              <Routes  key={location.pathname.split('/')[2]} location={location}>
                <Route path='online/*' element={<AdminOnline/>}/>
                <Route path='online/:id/add' element = {<AdminAddService/>}/>
                <Route path='online/:id/update/:id' element = {<AdminUpdateService/>}/>
                <Route path='online/add' element={<AdminAddOnline/>}/>
                <Route path ='online/update/:id' element={<AdminUpdateOnline/>}/>
                <Route path='offline/*' element={<AdminOffline/>}/>
                <Route path='offline/:id/add' element ={<AdminAddOfflineServ/>}/> 
                <Route path='offline/:id/update/:id' element = {<AdminUpdateOfflineServ/>}/>   
                <Route path='offline/add' element ={<AdminAddOffline/>}/>    
                <Route path ='offline/update/:id' element={<AdminUpdateOffline/>}/>
                <Route path='question' element={<AdminQuestion/>}/>
                <Route path='question/add' element={<AdminAddQuestion/>}/>
                <Route path='question/update/:id' element={<AdminUpdateQuestion/>}/>
                <Route path='news' element={<AdminNews/>}/>
                <Route path='news/add' element={<AdminAddNews/>}/>
                <Route path='news/update/:id' element={<AdminUpdateNews/>}/>
                <Route path='contacts' element={<AdminContacts/>}/>
                <Route path='contacts/add' element={<AdminAddContacts/>}/>
                <Route path='contacts/update/:id' element={<AdminUpdateContacts/>}/>
                <Route path='chat' element={<AdminChat/>}/>
              </Routes>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage