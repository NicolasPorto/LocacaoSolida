using Solid.Infra.Enums;

namespace Solid.Domain.Messaging.Imovel
{
    public class AtualizarImovelRequest
	{
		public Guid Codigo { get; set; }
		public Guid? CodigoLocador { get; set; }
		public Guid? CodigoCorretor { get; set; }
        public SituacaoImovel Situacao { get; set; }
        public TipoImovel TipoImovel { get; set; }
        public string? CEP { get; set; }
        public string? Logradouro { get; set; }
        public int? NumeroLogradouro { get; set; }
        public string? Cidade { get; set; }
        public string? Bairro { get; set; }
        public string? Complemento { get; set; }
        public string? InscricaoImobiliaria { get; set; }
    }
}
