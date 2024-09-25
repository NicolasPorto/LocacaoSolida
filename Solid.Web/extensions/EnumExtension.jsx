import { Situacao, EstadoCivil, TipoLocacao } from "../constants/enums"


export function ToSituacaoEnum(situacao) {
    switch (situacao) {
        case Situacao.Ativo:
            return 'Ativo'
        case Situacao.Inativo:
            return 'Inativo'
        default:
            return 'Desconhecida'
    }
}

export function ToEstadoCivilEnum(estado) {
    switch (estado) {
        case EstadoCivil.Solteiro:
            return 'Solteiro'
        case EstadoCivil.Casado:
            return 'Casado'
        default:
            return 'Desconhecida'
    }
}

export function ToTipoLocacaoEnum(estado) {
    switch (estado) {
        case TipoLocacao.Apartamento:
            return 'Apartamento'
        case TipoLocacao.Casa:
            return 'Casa'
        default:
            return 'Desconhecida'
    }
}

export function ToTipoLocacaoEnumComPrefixo(estado) {
    switch (estado) {
        case '1':
            return 'um apartamento'
        case '2':
            return 'uma casa'
        default:
            return 'Desconhecida'
    }
}

