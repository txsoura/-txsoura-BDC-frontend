import { createInstance, createRefreshInterceptor } from 'utils/apiConfig';

interface apiURL {
  development: string;
  production: string;
}

const authUrl: apiURL = {
  development: process.env.NEXT_PUBLIC_SERVICE_URL,
  production: process.env.NEXT_PUBLIC_SERVICE_URL,
};

const serviceURL: apiURL = {
  development: `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1`,
  production: `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1`,
};

export const authAPI = createInstance(authUrl);
export const serviceAPI = createInstance(serviceURL);

createRefreshInterceptor(authAPI);
createRefreshInterceptor(serviceAPI);
