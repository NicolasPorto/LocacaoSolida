import axios from "axios";

export const api = axios.create({
    baseURL: 'https://localhost:44327'
});

export const autenticar = async (user: { email: string, senha: string }): Promise<any> => {
    try {
        const response = await api.post("/autenticacao", user);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
}

