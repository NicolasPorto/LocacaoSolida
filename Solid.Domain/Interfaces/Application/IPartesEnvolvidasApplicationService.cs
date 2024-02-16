using Solid.Domain.Messaging.PartesEnvolvidas;
using Solid.Infra.Enums;

namespace Solid.Domain.Interfaces.Application
{
    public interface IPartesEnvolvidasApplicationService
    {
        List<PartesEnvolvidasResponse> BuscarPartesEnvolvidasPorTipoParte(TipoParte? tipo);
    }
}
