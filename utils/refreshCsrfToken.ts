import { AxiosError, AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

import { authAPI, serviceAPI } from 'services/api';

let isRetry = false;

export default async function refreshToken(
  { config: originalRequest }: AxiosError,
  axiosInstance: AxiosInstance,
) {
  if (isRetry === true) {
    window.location.href = '/auth/login';
  }

  isRetry = true;

  try {
    await authAPI.get('/sanctum/csrf-cookie');

    const csrfToken = Cookies.get('XSRF-TOKEN');

    authAPI.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
    serviceAPI.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
    axiosInstance.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;

    return axiosInstance(originalRequest);
  } catch (error) {
    return Promise.reject(error);
  }
}
