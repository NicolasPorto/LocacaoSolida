import axios from "axios";

export const api = axios.create({
    baseURL: 'https://localhost:44327'
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
        console.log(error)
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
