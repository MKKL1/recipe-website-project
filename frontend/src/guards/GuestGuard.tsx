import {useAuthContext} from "../contexts/AuthContext.tsx";
import {Navigate} from "react-router-dom";

export default function GuestGuard({children}){
    const {isAuth} = useAuthContext();

    return !isAuth ? children : <Navigate to="/recipes"/>
}