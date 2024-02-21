import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
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
        const response = await api.post('/ParteEnvolvida', request);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
}