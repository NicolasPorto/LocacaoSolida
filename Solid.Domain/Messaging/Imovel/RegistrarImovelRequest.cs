using Solid.Infra.Enums;

namespace Solid.Domain.Messaging.Imovel
{
    public class RegistrarImovelRequest
	{
		public Guid CodigoLocador { get; set; }
		public Guid CodigoCorretor { get; set; }
		public SituacaoImovel Situacao { get; set; }
		public TipoImovel TipoImovel { get; set; }
        public required string CEP { get; set; }
        public required string Logradouro { get; set; }
        public int NumeroLogradouro { get; set; }
        public required string Cidade { get; set; }
        public required string Bairro { get; set; }
        public string? Complemento { get; set; }
		public string? InscricaoImobiliaria { get; set; }
	}
}
