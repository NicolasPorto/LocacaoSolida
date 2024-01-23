using Solid.Domain.Messaging.Base;

namespace Solid.Domain.Messaging.Autenticacao
{
    public class AutenticacaoResponse : ResponseBase
    {
        public Guid Codigo { get; set; }
        public string? Token { get; set; }
    }
}
