import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import {useRouter} from 'next/router';
import {toast} from 'tailwind-toast'

import {authAPI, serviceAPI} from '/services/api';
import getApiError from "/utils/isApiError";
import {UserProps} from "/types/user";

interface LoginCredentials {
    email: string;
    password: string;
}

interface ContextProps {
    loading: boolean;
    user: UserProps

    logout(): Promise<void>;

    login(_credentials: LoginCredentials): Promise<boolean>;

    setLoading(_isLoading: boolean): void;

    getUser(): Promise<void>;
}

const AuthContext = createContext<ContextProps>({} as ContextProps);

const AuthProvider = ({children}) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState({} as UserProps);

    const logout = useCallback(async () => {
        authAPI.post('/auth/logout');

        delete authAPI.defaults.headers.Authorization;
        delete serviceAPI.defaults.headers.Authorization;

        await router.push('/auth/login');
    }, [router]);

    const login = useCallback(
        async ({email, password}) => {
            await authAPI.get('/sanctum/csrf-cookie');

            const csrfToken = Cookies.get('XSRF-TOKEN');

            authAPI.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
            serviceAPI.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;

            return await authAPI.post('auth/login', {
                email,
                password,
            });
        },
        [router],
    );

    const getUser = useCallback(async () => {
        try {
            const response = await authAPI.get('auth/user');
            setUser(response.data.data)

            setLoading(false);
        } catch (error) {
            const {isApi, status} = getApiError(error);

            if (isApi && status === 404) {
                toast().danger("Oops!", 'Usuário não encontrado!')
                    .with({
                        duration: 4000,
                        speed: 1000,
                        positionX: 'end',
                        positionY: 'top',
                        color: "bg-red-600",
                        fontColor: "black",
                        fontTone: 300
                    }).show()

                await router.push('/auth/login',);
            }

            toast().danger("Oops!", 'Não foi possível carregar as informações!')
                .with({
                    duration: 4000,
                    speed: 1000,
                    positionX: 'end',
                    positionY: 'top',
                    color: "bg-red-600",
                    fontColor: "black",
                    fontTone: 300
                }).show()
        }
    }, [login]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <AuthContext.Provider
            value={{
                setLoading,
                login,
                loading,
                logout,
                getUser,
                user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): ContextProps {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export {AuthProvider, useAuth};
