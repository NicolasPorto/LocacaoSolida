using Solid.Domain.Messaging.Corretor;

namespace Solid.Domain.Interfaces.Application
{
    public interface ICorretorApplicationService
    {
        List<CorretorResponse> BuscarCorretores();
    }
}
