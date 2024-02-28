import { createContext, ReactNode, useState } from "react";
import { buscar, criar, editar, obterImagem } from "../services/corretorApi"

type CorretorProviderProps = {
    children: ReactNode
}

type CorretorContextType = {
    error: string | undefined
    imagemByte: any
    buscarCorretores: () => Promise<any>
    inserirCorretor: (corretor: any) => Promise<any>
    editarCorretor: (corretor: any) => Promise<any>
    obterImagemPerfil: () => Promise<any>
}

export const CorretorContext = createContext({} as CorretorContextType);

export function CorretorProvider({ children }: CorretorProviderProps) {
    const [error, setError] = useState<string | undefined>(undefined);
    const [imagemByte, setImagemByte] = useState(undefined);

    async function buscarCorretores() {
        try {
            return await buscar();
        } catch (err: any) {
            setError(err);
        }
    }

    async function inserirCorretor(corretor: any) {
        try {
            corretor.tipoPessoa = parseInt(corretor.tipoPessoa)
            corretor.tipoCorretor = parseInt(corretor.tipoCorretor)
            corretor.situacao = parseInt(corretor.situacao)
            return await criar(corretor);
        } catch (err: any) {
            setError(err);
        }
    }

    async function editarCorretor(corretor: any) {
        try {
            corretor.tipoPessoa = parseInt(corretor.tipoPessoa)
            corretor.tipoCorretor = parseInt(corretor.tipoCorretor)
            corretor.situacao = parseInt(corretor.situacao)
            return await editar(corretor);
        } catch (err: any) {
            setError(err);
        }
    }

    async function obterImagemPerfil() {
        try {
            const imagemByte = await obterImagem();
            setImagemByte(imagemByte);
            return imagemByte;
        } catch (err: any) {
            setError(err);
        }
    }

    return (
        <CorretorContext.Provider value={{ error, imagemByte, buscarCorretores, inserirCorretor, editarCorretor, obterImagemPerfil }}>
            {children}
        </CorretorContext.Provider>
    )
}
