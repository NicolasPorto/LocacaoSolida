import axios from "axios";
import Cookies from 'js-cookie';

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const obter = async (): Promise<any> => {
    try {
        const response = await api.get('/Dashboard');
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
}