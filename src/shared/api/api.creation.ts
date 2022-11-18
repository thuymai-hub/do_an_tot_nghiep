import axios, { AxiosInstance } from 'axios';
import { configuration } from 'config/configuration';
import Cookies from 'js-cookie';
import { CLI_COOKIE_KEYS } from 'shared/services/cli-cookie';
import { handleResponseError, handleResponseSuccess } from './interceptors/response';

export const createApiInstance = (host: string, requestTimeout = 20000): AxiosInstance => {
  const apiInstance = axios.create({
    baseURL: host,
    headers: {
      'Content-Type': 'application/json',
      'x-user-agent': `web-dashboard-${configuration.ENVIRONMENT}`,
      'x-user-timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      'Access-Control-Allow-Origin': '*'
    },
    timeout: requestTimeout,
    responseType: 'json'
  });

  apiInstance.interceptors.request.use(
    async (config: any) => {
      const accessToken = Cookies.get(CLI_COOKIE_KEYS.ACCESS_TOKEN) || '';
      config.headers.Authorization = `Bearer ${accessToken.replace(/"/g, '')}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiInstance.interceptors.response.use(
    (response) => handleResponseSuccess(response),
    (error) => handleResponseError(error)
  );

  return apiInstance;
};
