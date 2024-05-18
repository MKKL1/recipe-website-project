import {useAuthContext} from "../contexts/AuthContext.tsx";
import {Navigate} from "react-router-dom";

export default function AuthGuard({children}){
    const {isAuth} = useAuthContext();

    return isAuth ? children : <Navigate to="/login"/>
}