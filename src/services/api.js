import axios from 'axios';

const api = axios.create({
    baseURL: 'http://164.90.162.56:8000/'
});

const refreshToken = async () => {
    try {
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (!storedRefreshToken) {
            return null;
        }

        const response = await api.post('/auth/api/refresh/', {
            refresh: storedRefreshToken
        });

        if (response.data && response.data.access) {
            localStorage.setItem("accessToken", response.data.access);
            return response.data.access;
        }

        return null;
    } catch (error) {
        console.error("Error during token refresh:", error);
        return null;
    }
};

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await refreshToken();

            if (newAccessToken) {
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);

export default api;