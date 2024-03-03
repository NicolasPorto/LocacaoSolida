using Solid.Infra.Enums;

namespace Solid.Domain.Messaging.ValorFixo
{
    public class RegistrarValorFixoRequest
    {
        public Guid CodigoCorretor { get; set; }
        public required string Nome { get; set; }
        public decimal Valor { get; set; }
        public int PorcentagemValor { get; set; }
        public TipoValor TipoValor { get; set; }
    }
}
