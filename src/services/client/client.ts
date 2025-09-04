
import axios from 'axios';
import { useAuthStore } from '../../store';

export const apiClient = axios.create({
    baseURL: 'http://localhost:5501',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
})
const refreshToken = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {}, {
        withCredentials: true,
    })
};

apiClient.interceptors.request.use((response) => response, async (error) => {

    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        try {
            const headers = { ...originalRequest.headers, }
            originalRequest._retry = true;
            await refreshToken();
            return apiClient.request({ ...originalRequest, headers });
        } catch (err) {
            console.log('Retrying request after refreshing token', err);
            useAuthStore.getState().logout();
            return Promise.reject(err);
        }
    }
    return Promise.reject(error);
})