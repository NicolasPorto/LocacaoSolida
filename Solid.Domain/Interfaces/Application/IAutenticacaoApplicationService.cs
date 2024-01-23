using Solid.Domain.Messaging.Autenticacao;

namespace Solid.Domain.Interfaces.Application
{
    public interface IAutenticacaoApplicationService
    {
        AutenticacaoResponse Autenticar(AutenticacaoRequest request);
    }
}
