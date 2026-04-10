import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  withCredentials: true
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const statusCode = error.response?.status;
        console.error('[Axios] Ops, interceptou um erro de retorno:', statusCode);

        if (statusCode === 401) {
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);
