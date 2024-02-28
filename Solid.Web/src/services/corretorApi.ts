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
        const response = await api.get('/Corretor');
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
}

export const criar = async (request : any): Promise<any> => {
    try {
        const response = await api.post('/Corretor', request);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
}

export const editar = async (request : any): Promise<any> => {
    try {
        const response = await api.put('/Corretor', request);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
}

export const salvarImagem = async (imagemData: FormData): Promise<any> => {
    try {
        const response = await api.post('/Corretor/ImagemPerfil', imagemData);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
}

export const obterImagem = async (): Promise<any> => {
    try {
        const response = await api.get('/Corretor/ImagemPerfil');
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
}