import { cpfCnpjMask, phoneMask, currencyBrlMask } from 'util-mask';
import { formatInTimeZone } from 'date-fns-tz'

export function FormatarDocumentoFederal(documento: any) {
    return cpfCnpjMask(documento)
}

export function FormatarNumeroCelular(documento: any) {
    return phoneMask(documento)
}

export function FormatarData(data: any) {
    return formatInTimeZone(data, 'America/Sao_Paulo', 'dd/MM/yyyy');
}

export function FormatarValor(valor: any) {
    return currencyBrlMask(valor)
}
