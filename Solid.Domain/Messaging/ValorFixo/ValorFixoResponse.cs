using Solid.Domain.Messaging.Base;
using Solid.Infra.Enums;

namespace Solid.Domain.Messaging.ValorFixo
{
    public class ValorFixoResponse : ResponseBase
    {
        public Guid Codigo { get; set; }
        public Guid CodigoCorretor { get; set; }
        public required string Nome { get; set; }
        public decimal Valor { get; set; }
        public int PorcentagemValor { get; set; }
        public TipoValor TipoValor { get; set; }
        public DateTime DtInclusao { get; set; }
    }
}
