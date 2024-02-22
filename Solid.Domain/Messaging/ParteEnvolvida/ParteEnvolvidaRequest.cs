using Solid.Infra.Enums;

namespace Solid.Domain.Messaging.ParteEnvolvida
{
    public class ParteEnvolvidaRequest
    {
        public Guid Codigo { get; set; }
        public TipoParte TipoParte { get; set; }
        public required string Nome { get; set; }
        public required string Email { get; set; }
        public required string CPF { get; set; }
        public string? CEP { get; set; }
        public string? Logradouro { get; set; }
        public int? NumeroLogradouro { get; set; }
        public string? Cidade { get; set; }
        public required string Nacionalidade { get; set; }
        public string? Profissao { get; set; }
        public string? Empresa { get; set; }
        public string? NumeroCelular { get; set; }
        public string? TelefoneComercial { get; set; }
        public decimal? ValorRenda { get; set; }
        public EstadoCivil EstadoCivil { get; set; }
        public bool PossuiConjuge { get; set; } = false;
        public string? Conjuge { get; set; }
        public string? CPFConjuge { get; set; }
    }
}
