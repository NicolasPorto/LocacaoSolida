using Solid.Domain.Interfaces.Application;
using Solid.Domain.Messaging.PartesEnvolvidas;
using Solid.Infra.Enums;

namespace Solid.Application.ApplicationServices
{
    public class PartesEnvolvidasApplicationService : IPartesEnvolvidasApplicationService
    {
        public PartesEnvolvidasApplicationService()
        {
        }

        public List<PartesEnvolvidasResponse> BuscarPartesEnvolvidasPorTipoParte(TipoParte? tipo)
        {
            throw new NotImplementedException();
        }
    }
}
