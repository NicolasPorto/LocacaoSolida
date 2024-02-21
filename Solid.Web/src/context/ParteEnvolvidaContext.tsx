import { createContext, ReactNode, useState, useEffect } from "react";
import { buscar, criar, api } from "../services/parteEnvolvidaApi"
import Cookies from 'js-cookie';

type ParteEnvolvidaProviderProps = {
    children: ReactNode
}

type ParteEnvolvidaContextType = {
    error: string | undefined
    buscarPartesEnvolvidas: (tipoParte: number) => Promise<any>
    inserirParteEnvolvida: (parteEnvolvida: any) => Promise<any>
    editarParteEnvolvida: (parteEnvolvida: any) => Promise<any>
}

export const ParteEnvolvidaContext = createContext({} as ParteEnvolvidaContextType);

export function ParteEnvolvidaProvider({ children }: ParteEnvolvidaProviderProps) {
    const [error, setError] = useState<string | undefined>(undefined);
    
    useEffect(() => {
        const token = Cookies.get('token');
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }, []);

    async function buscarPartesEnvolvidas(tipoParte: number) {
        try {
            return await buscar(tipoParte);
        } catch (err: any) {
            setError(err);
        }
    }

    async function inserirParteEnvolvida(parteEnvolvida: any) {
        try {
            return await criar(parteEnvolvida);
        } catch (err: any) {
            setError(err);
        }
    }

    async function editarParteEnvolvida(parteEnvolvida: any) {
        try {
            return await criar(parteEnvolvida);
        } catch (err: any) {
            setError(err);
        }
    }

    return (
        <ParteEnvolvidaContext.Provider value={{ error, buscarPartesEnvolvidas, inserirParteEnvolvida, editarParteEnvolvida }}>
            {children}
        </ParteEnvolvidaContext.Provider>
    )
}
