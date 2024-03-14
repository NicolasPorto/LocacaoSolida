import { createContext, ReactNode, useState } from "react";
import { buscar } from "../services/contratoApi"

type ContratoProviderProps = {
    children: ReactNode
}

type ContratoContextType = {
    error: string | undefined
    limparErro: () => any
    buscarContratos: () => Promise<any>
}

export const ContratoContext = createContext({} as ContratoContextType);

export function ContratoProvider({ children }: ContratoProviderProps) {
    const [error, setError] = useState<string | undefined>(undefined);

    async function buscarContratos() {
        try {
            // return await buscar();
        } catch (err: any) {
            setError(err);
        }
    }

    const limparErro = () => {
        setError(undefined);
    }

    return (
        <ContratoContext.Provider value={{ error, buscarContratos, limparErro }}>
            {children}
        </ContratoContext.Provider>
    )
}
