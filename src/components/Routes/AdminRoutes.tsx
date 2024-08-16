import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAppSelector } from "../../hooks/useTypedRedux";
import Spiner from "../Spiner/Spiner";

interface AdminRouteProps {
    children: ReactNode;
  }

const AdminRoute = ({children}: AdminRouteProps) =>{
    const {currentUser, status} = useAppSelector(state=> state.user);
    if(status === 'loading') {
        return <Spiner/>
    }
    if (currentUser?.role !== 'ADMIN') {
        return <Navigate to='/'/>;
    }
        
    return children;
}

export default AdminRoute;