using Solid.Domain.Messaging.Base;
using Solid.Infra.Enums;

namespace Solid.Domain.Messaging.PartesEnvolvidas
{
    public class PartesEnvolvidasResponse : ResponseBase
    {
        public Guid Codigo { get; set; }
        public Guid CodigoCorretor { get; set; }
        public required string Nome { get; set; }
        public required string Email { get; set; }
        public required string CPF { get; set; }
        public TipoParte TipoParte { get; set; }
        public EstadoCivil EstadoCivil { get; set; }
        public string? Profissao { get; set; }
        public required string Nacionalidade { get; set; }
        public required string Cidade { get; set; }
        public string? Endereco { get; set; }
        public string? Empresa { get; set; }
        public string? NumeroCelular { get; set; }
        public string? TelefoneComercial { get; set; }
        public decimal? ValorRenda { get; set; }
        public bool PossuiConjuge { get; set; } = false;
        public string? Conjuge { get; set; }
        public string? CPFConjuge { get; set; }
        public DateTime DtInclusao { get; set; }
    }
}
