using Solid.Domain.Models;
using Solid.Infra.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Solid.Domain.Entities
{
    [Table("ContratoLocacao", Schema = "cad")]
    public class ContratoLocacao : EntityBase
    {
        public Guid CodigoLocador { get; set; }
        public Guid CodigoLocatario { get; set; }
        public Guid? CodigoFiador { get; set; }
        public Guid CodigoCorretor { get; set; }
        public Guid CodigoImovel { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public int QuantidadeParcelas { get; set; }
        public TipoFinsImovel TipoFinsImovel { get; set; }
        public decimal ValorAluguel { get; set; }
        public int DiaPrazoPagamento { get; set; }
        public decimal MultaAtraso { get; set; }
        public required string ContratoHTML { get; set; }
        public DateTime DtInclusao { get; set; }
        public SituacaoImovel Situacao { get; set; }
    }
}
