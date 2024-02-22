using Solid.Domain.Messaging.Imovel;
using Solid.Domain.Models;
using Solid.Infra.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Solid.Domain.Entities
{
	[Table("Imovel", Schema = "cad")]
	public class Imovel : EntityBase
	{
		public Guid Codigo { get; set; }
		public Guid CodigoLocador { get; set; }
		public Guid CodigoCorretor { get; set; }
		public SituacaoImovel Situacao { get; set; }
		public TipoImovel TipoImovel { get; set; }
        public string? CEP { get; set; }
        public string? Logradouro { get; set; }
        public int? NumeroLogradouro { get; set; }
        public string? Cidade { get; set; }
        public string? Bairro { get; set; }
        public string? Complemento { get; set; }
		public string? InscricaoImobiliaria { get; set; }
		public DateTime DtInclusao { get; set; }

        public Imovel() {}

        public Imovel(RegistrarImovelRequest request)
        {
			Codigo = Guid.NewGuid();
			CodigoLocador = request.CodigoLocador;
			CodigoCorretor = request.CodigoCorretor;
			Situacao = request.Situacao;
			TipoImovel = request.TipoImovel;
			CEP = request.CEP;
			Logradouro = request.Logradouro;
			NumeroLogradouro = request.NumeroLogradouro;
			Cidade = request.Cidade;
			Bairro = request.Bairro;
			Complemento = request.Complemento;
			InscricaoImobiliaria = request.InscricaoImobiliaria;
			DtInclusao = DateTime.Now;
        }
    }
}
