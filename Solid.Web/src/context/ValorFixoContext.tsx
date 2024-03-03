import { createContext, ReactNode, useState } from "react";
import { buscar, criar, atualizar } from "../services/valorFixoApi"

type ValorFixoProviderProps = {
    children: ReactNode
}

type ValorFixoContextType = {
    error: string | undefined
    buscarValorFixo: () => Promise<any>
    inserirValorFixo: (valorFixo: any) => Promise<any>
    editarValorFixo: (valorFixo: any) => Promise<any>
    limparErro: () => any
}

export const ValorFixoContext = createContext({} as ValorFixoContextType);

export function ValorFixoProvider({ children }: ValorFixoProviderProps) {
    const [error, setError] = useState<string | undefined>(undefined);

    async function buscarValorFixo() {
        try {
            return await buscar();
        } catch (err: any) {
            setError(err);
        }
    }

    async function inserirValorFixo(valor: any) {
        try {
            console.log(valor)
            valor.tipoValor = parseInt(valor.tipoValor)
            return await criar(valor);
        } catch (err: any) {
            setError(err);
        }
    }

    async function editarValorFixo(valor: any) {
        try {
            return await atualizar(valor);
        } catch (err: any) {
            setError(err);
        }
    }

    const limparErro = () => {
        setError(undefined);
    }

    return (
        <ValorFixoContext.Provider value={{ error, limparErro, buscarValorFixo, inserirValorFixo, editarValorFixo }}>
            {children}
        </ValorFixoContext.Provider>
    )
}
