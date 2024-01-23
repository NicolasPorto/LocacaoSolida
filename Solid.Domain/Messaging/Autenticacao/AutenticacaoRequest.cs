namespace Solid.Domain.Messaging.Autenticacao
{
    public class AutenticacaoRequest
    {
        public required string Email { get; set; }
        public required string Senha { get; set; }
    }
}
