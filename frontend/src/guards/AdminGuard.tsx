import {useAuthContext} from "../contexts/AuthContext.tsx";
import {Navigate} from "react-router-dom";

export default function AdminGuard({children}){
    const {isAuth, user} = useAuthContext();
    const isAdmin = user.roles.includes("admin");

    return isAuth && isAdmin ? children : <Navigate to="/login"/>
}