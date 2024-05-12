import React, { createContext, useContext, useState } from 'react';
import {User} from "../models/User.ts";

type AuthContextType = {
    token: string;
    isAuth: boolean;
    user: User
    updateAuth: (accessToken: string, user: User) => void;
    resetToken: () => void;
};

const AuthContext = createContext<AuthContextType>({
    token: '',
    isAuth: false,
    user: new User("", "","", []),
    updateAuth: () => {},
    resetToken: () => {}
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [token, setToken] = useState<string>('');
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [user, setUser] = useState<User>(new User("","","",[]));

    const updateAuth = (accessToken: string, user: User) => {
        setIsAuth(true);
        setUser(user);
        setToken(accessToken);
    };

    const resetToken = () => {
        setIsAuth(false);
        setToken("");
    }

    return (
        <AuthContext.Provider value={{ token, updateAuth, isAuth, resetToken, user }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);