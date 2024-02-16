import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

export const autenticar = async (user: { email: string, senha: string }): Promise<any> => {
    try {
        const response = await api.post("/Autenticacao", user);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
}

export const recuperarInfoUsuario = async (token: string): Promise<any> => {
    try {
        api.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${token}`
            return config;
        });

        const response = await api.get(`/Autenticacao/RecuperarInfoUsuario?token=${token}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
}

