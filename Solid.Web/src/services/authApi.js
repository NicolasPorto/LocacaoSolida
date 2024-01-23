import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const autenticarUsuario = async (autenticarRequest) => {
    try {
        const response = await api.post("/autenticacao", autenticarRequest);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}