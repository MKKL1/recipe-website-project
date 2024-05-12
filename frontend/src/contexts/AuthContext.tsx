import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
    token: string;
    isAuth: boolean;
    // add user
    updateToken: (accessToken: string) => void;
    resetToken: () => void;
};

const AuthContext = createContext<AuthContextType>({
    token: '',
    isAuth: false,
    updateToken: () => {},
    resetToken: () => {}
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [token, setToken] = useState<string>('');
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const updateToken = (accessToken: string) => {
        setIsAuth(true);
        setToken(accessToken);
    };

    const resetToken = () => {
        setIsAuth(false);
        setToken("");
    }

    return (
        <AuthContext.Provider value={{ token, updateToken, isAuth, resetToken }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);