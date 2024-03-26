import { Situacao, TipoCorretor, EstadoCivil, TipoImovel, SituacaoImovel, TipoValor, TipoFinsImovel } from "../constants/enums"


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
