import React, {createContext, useContext, useState} from "react";

type NotificationContextType = {
    message: string;
    variant: string;
    flag: boolean;
    pushNotification: (message: string, variant: string) => void;
};

const NotificationContext = createContext<NotificationContextType>({
   message: '',
   variant: '',
    flag: false,
   pushNotification: () => {}
});

export const NotificationProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [flag, setFlag] = useState(false);

  function pushNotification(message: string, variant: string){
      setMessage(message);
      setVariant(variant);
      setFlag(!flag);
  }

  return (
    <NotificationContext.Provider value={{message, variant, flag, pushNotification}}>
        {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);