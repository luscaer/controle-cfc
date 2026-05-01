import axios from "axios";

const rotasPublicas = ["/login", "/esqueci-senha", "/redefinir-senha"]

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const statusCode = error.response?.status;
    const currentPath = window.location.pathname;

    const isPublicRoute = rotasPublicas.some(rota => currentPath.startsWith(rota));

    if (statusCode === 401 && !isPublicRoute) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
