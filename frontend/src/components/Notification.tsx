import {useEffect, useState} from "react";
import {Alert} from "react-bootstrap";
import {useNotificationContext} from "../contexts/NotificationContext.tsx";
import {Variant} from "../models/Variant.ts";

export default function Notification({message, variant}: {message: string, variant: Variant}){
    const {flag} = useNotificationContext();
    const [isVisible, setIsVisible] = useState(true);
    const time = 4000;

    useEffect(() => {
        setIsVisible(true);

        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, time);

        return () => clearTimeout(timeout);
    }, [flag]);

    return (
        <div style={{ display: isVisible ? 'block' : 'none', position: "fixed", top: "75px", right: "50px"}}>
            <Alert variant={variant} style={{width: '30vw'}} >{message}</Alert>
        </div>
    );
}