import { createContext, ReactNode, useState } from "react";
import { atualizar, buscar, criar, obterCombo } from "../services/parteEnvolvidaApi"

type ParteEnvolvidaProviderProps = {
    children: ReactNode
}

type ParteEnvolvidaContextType = {
    error: string | undefined
    buscarPartesEnvolvidas: (tipoParte: number) => Promise<any>
    obterComboParteEnvolvida: (tipoParte: number) => Promise<any>
    inserirParteEnvolvida: (parteEnvolvida: any) => Promise<any>
    editarParteEnvolvida: (parteEnvolvida: any) => Promise<any>
    limparErro: () => any
}

export const ParteEnvolvidaContext = createContext({} as ParteEnvolvidaContextType);

export function ParteEnvolvidaProvider({ children }: ParteEnvolvidaProviderProps) {
    const [error, setError] = useState<string | undefined>(undefined);

    async function buscarPartesEnvolvidas(tipoParte: number) {
        try {
            return await buscar(tipoParte);
        } catch (err: any) {
            setError(err);
        }
    }

    async function obterComboParteEnvolvida(tipoParte: number) {
        try {
            return await obterCombo(tipoParte);
        } catch (err: any) {
            setError(err);
        }
    }

    async function inserirParteEnvolvida(parteEnvolvida: any) {
        try {
            parteEnvolvida.estadoCivil = parseInt(parteEnvolvida.estadoCivil)
            return await criar(parteEnvolvida);
        } catch (err: any) {
            setError(err);
        }
    }

    async function editarParteEnvolvida(parteEnvolvida: any) {
        try {
            parteEnvolvida.estadoCivil = parseInt(parteEnvolvida.estadoCivil)
            return await atualizar(parteEnvolvida);
        } catch (err: any) {
            setError(err);
        }
    }

    const limparErro = () => {
        setError(undefined);
    }

    return (
        <ParteEnvolvidaContext.Provider value={{ error, limparErro, buscarPartesEnvolvidas, inserirParteEnvolvida, editarParteEnvolvida, obterComboParteEnvolvida }}>
            {children}
        </ParteEnvolvidaContext.Provider>
    )
}
