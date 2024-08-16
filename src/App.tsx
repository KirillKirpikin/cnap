import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import AppRoutes from "./components/Routes/AppRoutes"
import Preloader from "./components/Spiner/Preloader";
import { Suspense, useEffect, useState } from "react"
import { ToastContainer } from "react-toastify";
import { checkUser } from "./store/user/userSlice";
import { useAppDispatch } from "./hooks/useTypedRedux";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(checkUser())
    setIsLoading(false)
  }, [dispatch])

  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="flex-grow">
        {isLoading ? <Preloader/> : <Suspense fallback={<Preloader/>}><AppRoutes/></Suspense>}        
      </main>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

export default App
