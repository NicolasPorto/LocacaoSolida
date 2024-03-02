import { TipoPessoa, Situacao, TipoCorretor, EstadoCivil, TipoImovel, SituacaoImovel } from "../constants/enums"

export function ToTipoPessoaEnum(tipoPessoa: any) {
    switch (tipoPessoa) {
        case TipoPessoa.Fisica:
            return 'Física'
        case TipoPessoa.Juridica:
            return 'Jurídica'
        default:
            return 'Desconhecida'
    }
}

export function ToSituacaoEnum(situacao: any) {
    switch (situacao) {
        case Situacao.Ativo:
            return 'Ativo'
        case Situacao.Inativo:
            return 'Inativo'
        default:
            return 'Desconhecida'
    }
}

export function ToEstadoCivilEnum(estado: any) {
    switch (estado) {
        case EstadoCivil.Solteiro:
            return 'Solteiro'
        case EstadoCivil.Casado:
            return 'Casado'
        default:
            return 'Desconhecida'
    }
}

export function ToTipoCorretorEnum(situacao: any) {
    switch (situacao) {
        case TipoCorretor.Comum:
            return 'Comum'
        case TipoCorretor.Administrador:
            return 'Administrador'
        default:
            return 'Desconhecido'
    }
}

export function ToTipoImovelEnum(tipo: any) {
    switch (tipo) {
        case TipoImovel.Apartamento:
            return 'Apartamento'
        case TipoImovel.Casa:
            return 'Casa'
        default:
            return 'Desconhecido'
    }
}

export function ToTipoSituacaoImovelEnum(tipo: any) {
    switch (tipo) {
        case SituacaoImovel.Livre:
            return 'Livre'
        case SituacaoImovel.Locado:
            return 'Locado'
        case SituacaoImovel.Reservado:
            return 'Reservado'
        case SituacaoImovel.Inativo:
            return 'Inativo'
        default:
            return 'Desconhecido'
    }
}