using Solid.Domain.Messaging.ParteEnvolvida;
using Solid.Infra.Enums;

namespace Solid.Domain.Interfaces.Application
{
    public interface IParteEnvolvidaApplicationService
    {
        List<ParteEnvolvidaResponse> BuscarPartesEnvolvidasPorTipoParte(TipoParte? tipo);
        ParteEnvolvidaResponse Inserir(ParteEnvolvidaRequest request);
    }
}
