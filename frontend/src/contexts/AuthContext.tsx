import React, { createContext, useContext, useState } from 'react';
import {User} from "../models/User.ts";

type AuthContextType = {
    token: string;
    isAuth: boolean;
    user: User;
    updateToken: (accessToken: string) => void;
    resetToken: () => void;
};

const AuthContext = createContext<AuthContextType>({
    token: '',
    isAuth: false,
    user: new User("","", "",[]),
    updateToken: () => {},
    resetToken: () => {}
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [token, setToken] = useState<string>('');
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [user, setUser] = useState<User>(new User("","","",[]));

    // TODO check if token is expired before returning it to components
    // data provided in iat and exp field of accessToken

    const updateToken = (accessToken: string) => {
        setIsAuth(true);
        setToken(accessToken);
        const parts = accessToken.split('.');
        const decodedPayload = JSON.parse(atob(parts[1]));
        console.log(decodedPayload);
        setUser(new User(
            decodedPayload.sub,
            decodedPayload.username,
            decodedPayload.email,
            decodedPayload.roles
        ));
    };

    const resetToken = () => {
        setIsAuth(false);
        setToken("");
        setUser(new User("","","",[]));
    }

    return (
        <AuthContext.Provider value={{ token, updateToken, isAuth, resetToken, user }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);