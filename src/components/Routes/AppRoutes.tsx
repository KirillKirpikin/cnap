import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRoute from './AdminRoutes';
import Auth from '../Auth/Auth';

const HomePage = lazy(()=>import('../pages/HomePage'));
const NewsPage = lazy(()=>import('../pages/NewsPage'));
const NewsSinglePage = lazy(()=>import('../pages/NewsSinglePage'));
const AdminPage = lazy(()=>import('../pages/AdminPage'));


const AppRoutes = () => {
  return (
    <Routes>  
      <Route path='/*' element  ={<HomePage/>}/>
      <Route path='/news' element= {<NewsPage/>}/>
      <Route path='/news/:id' element={<NewsSinglePage/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='admin/*' element={
        <AdminRoute>
          <AdminPage/>
        </AdminRoute>
      }/>  
    </Routes>
  )
}

export default AppRoutes