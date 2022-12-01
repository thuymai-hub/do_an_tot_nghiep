
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import LocalStorage from './LocalStorage';
const REACT_APP_API_URL = 'http://localhost:8000/wp-json/wp'


const AxiosClient = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
});

// export const Notification = (status: NotificationType, msg: any) => {
//     if (status !== 'error') {
//         notification[status]({
//             message: 'Thông báo',
//             description: msg,
//         });
//     } else {
//         notification[status]({
//             message: 'Thông báo',
//             description: msg,
//         });
//     }
// };

// handle request to convert all api requests to snake_case
AxiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
    const token = LocalStorage.getToken();

    const newConfig = { ...config };
    if (token && newConfig.headers) {
        newConfig.headers.Authorization = `Bearer ${token}`;
    }

    if (newConfig.headers && newConfig.headers['Content-Type'] === 'multipart/form-data') return newConfig;

    // convert request to snake_case
    if (config.params) {
        newConfig.params = config.params;
    }
    if (config.data) {
        newConfig.data = config.data;
    }

    return newConfig;
});

// handle response to convert all api responses to camelCase
AxiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response && response.data) {
            if (!response.data.status || response.data.code === 400 || response.data.code === 403) {
                switch (response.data.code) {
                    case 400:
                        // handle error
                        break;
                    case 403:
                        // handle error
                        break;
                    default:
                        // Notification('error', response?.data?.message);
                        break;
                }
            }
            // cover response to camelCase
            return response.data;
        }

        return response;
    },
    (error) => {
        // Handle errors
        // error?.response?.data?.message && Notification('error', error?.response?.data?.message);
        return error;
    }
);

export default AxiosClient;
