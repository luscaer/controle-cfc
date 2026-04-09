import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.BASE_URL || "http://localhost:8080/api",
});

apiClient.interceptors.request.use(
    (config) => {
        console.log('[Axios] Requisição interceptada indo para:', config.url);

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const statusCode = error.response?.status;
        console.error('[Axios] Ops, interceptou um erro de retorno:', statusCode);

        if (statusCode === 401) {
            
        }

        return Promise.reject(error);
    }
);
