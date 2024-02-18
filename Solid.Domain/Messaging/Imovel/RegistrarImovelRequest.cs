using Solid.Infra.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Domain.Messaging.Imovel
{
	public class RegistrarImovelRequest
	{
		public Guid CodigoLocador { get; set; }
		public Guid CodigoCorretor { get; set; }
		public SituacaoImovel Situacao { get; set; }
		public TipoImovel TipoImovel { get; set; }
		public string Logradouro { get; set; }
		public int NumeroLogradouro { get; set; }
		public string Bairro { get; set; }
		public string? Complemento { get; set; }
		public string InscricaoImobiliaria { get; set; }
	}
}
