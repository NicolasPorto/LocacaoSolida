using Solid.Domain.Messaging.Base;
using Solid.Infra.Enums;

namespace Solid.Domain.Messaging.ValorFixo
{
    public class AtualizarValorFixoRequest
    {
        public Guid Codigo { get; set; }
        public Guid CodigoCorretor { get; set; }
        public required string Nome { get; set; }
        public decimal Valor { get; set; }
        public decimal PorcentagemValor { get; set; }
        public TipoValor TipoValor { get; set; }
    }
}
