import { createContext, ReactNode, useState } from "react";
import { buscar, criar, atualizar, obterCombo } from "../services/imovelApi"

type ImovelProviderProps = {
    children: ReactNode
}

type ImovelContextType = {
    error: string | undefined
    buscarImoveis: () => Promise<any>
    inserirImovel: (imovel: any) => Promise<any>
    editarImovel: (imovel: any) => Promise<any>
    obterComboImoveis: () => Promise<any>
    limparErro: () => any
}

export const ImovelContext = createContext({} as ImovelContextType);

export function ImovelProvider({ children }: ImovelProviderProps) {
    const [error, setError] = useState<string | undefined>(undefined);

    async function buscarImoveis() {
        try {
            return await buscar();
        } catch (err: any) {
            setError(err);
        }
    }

    async function inserirImovel(imovel: any) {
        try {
            imovel.tipoImovel = parseInt(imovel.tipoImovel);
            imovel.situacao = parseInt(imovel.situacao);
            return await criar(imovel);
        } catch (err: any) {
            setError(err);
        }
    }

    async function editarImovel(imovel: any) {
        try {
            imovel.tipoImovel = parseInt(imovel.tipoImovel);
            imovel.situacao = parseInt(imovel.situacao);
            return await atualizar(imovel);
        } catch (err: any) {
            setError(err);
        }
    }

    async function obterComboImoveis() {
        try {
            return await obterCombo();
        } catch (err: any) {
            setError(err);
        }
    }

    const limparErro = () => {
        setError(undefined);
    }

    return (
        <ImovelContext.Provider value={{ error, limparErro, buscarImoveis, inserirImovel, editarImovel, obterComboImoveis }}>
            {children}
        </ImovelContext.Provider>
    )
}
