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

export const buscar = async (tipoParte: number): Promise<any> => {
    try {
        const response = await api.get(`/ParteEnvolvida?tipoParte=${tipoParte}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
}

export const criar = async (request : any): Promise<any> => {
    try {
        console.log(request)
        const response = await api.post('/ParteEnvolvida', request);
        return response.data;
    } catch (error: any) {
        console.log(error)
        throw error.response.data.message;
    }
}