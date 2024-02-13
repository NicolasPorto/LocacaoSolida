using Solid.Domain.Messaging.Base;
using Solid.Infra.Enums;
using System.Text.Json.Serialization;

namespace Solid.Domain.Messaging.Autenticacao
{
    public class RecuperarInfoUsuarioResponse : ResponseBase
    {
        [JsonPropertyName("codigo")]
        public string CodigoCorretor { get; set; } = string.Empty;

        [JsonPropertyName("nome")]
        public string Nome { get; set; } = string.Empty;

        [JsonPropertyName("email")]
        public string Email { get; set; } = string.Empty;

        [JsonPropertyName("tipo")]
        public string Tipo { get; set; } = string.Empty;
    }
}
