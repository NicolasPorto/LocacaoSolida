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

export const buscar = async (): Promise<any> => {
    try {
        const response = await api.get(`/Imovel`);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
}

export const criar = async (request : any): Promise<any> => {
    try {
        const response = await api.post('/Imovel', request);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
}

export const atualizar = async (request : any): Promise<any> => {
    try {
        const response = await api.put('/Imovel', request);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
}

export const obterCombo = async (): Promise<any> => {
    try {
        const response = await api.get('/Imovel/Combo');
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
}