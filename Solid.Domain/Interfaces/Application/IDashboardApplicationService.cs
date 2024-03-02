using Solid.Domain.Messaging.Dashboard;

namespace Solid.Domain.Interfaces.Application
{
    public interface IDashboardApplicationService
    {
        DashboardDadosResponse ObterDados();
    }
}
