import axios from "axios";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";

const api = axios.create({
    baseURL: BASE_URL,
})
export default api;
api.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (err) {
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
            try {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            } catch (e) {
            }
        }
        return Promise.reject(error);
    }
);
export default api;
