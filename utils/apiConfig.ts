import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse,} from 'axios';
import Router from "next/router";

import refreshCsrfToken from './refreshCsrfToken';

interface ApiUrlProps {
    development: string;
    production: string;
}

const options = (urls: ApiUrlProps) => {
    const apiOptions: AxiosRequestConfig = {
        withCredentials: true,
        baseURL: urls[process.env.NODE_ENV],
        headers: {
            Accept: 'application/json',
            locale: 'pt',
            'Content-Type': 'application/json',
        },
    };

    return apiOptions;
};

export const createInstance = (url: ApiUrlProps) => {
    return axios.create(options(url));
};

const apiSuccess = async (response: AxiosResponse) => {
    return response;
};

const apiError = async (error: AxiosError, axiosInstance: AxiosInstance) => {
    if (
        error.response &&
        error.response.status &&
        error.response.status === 419
    ) {
        return refreshCsrfToken(error, axiosInstance);
    }

    if (
        error.response &&
        error.response.status &&
        error.response.status === 401
    ) {
        if (Router.pathname !== '/auth/login')
            return await Router.push('/auth/login');
    }

    return Promise.reject(error);
};

export const createRefreshInterceptor = (axiosInstance: AxiosInstance) => {
    return axiosInstance.interceptors.response.use(apiSuccess, error => {
        return apiError(error, axiosInstance);
    });
};
