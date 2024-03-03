using Solid.Domain.Messaging.ValorFixo;
using Solid.Domain.Models;
using Solid.Infra.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Solid.Domain.Entities
{
    [Table("ValorFixo", Schema = "cad")]
    public class ValorFixo : EntityBase
    {
        public Guid CodigoCorretor { get; set; }
        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public int PorcentagemValor { get; set; }
        public TipoValor TipoValor { get; set; }
        public DateTime DtInclusao { get; set; }

        public ValorFixo() { }

        public ValorFixo(RegistrarValorFixoRequest request, Guid codigoCorretor) 
        { 
            CodigoCorretor = codigoCorretor;
            Nome = request.Nome;
            Valor = request.Valor;
            PorcentagemValor = request.PorcentagemValor;
            TipoValor = request.TipoValor;
            DtInclusao = DateTime.Now;
        }
    }
}
