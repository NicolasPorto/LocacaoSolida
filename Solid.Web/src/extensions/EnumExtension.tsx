import { TipoPessoa, Situacao, TipoCorretor, EstadoCivil } from "../constants/enums"

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
