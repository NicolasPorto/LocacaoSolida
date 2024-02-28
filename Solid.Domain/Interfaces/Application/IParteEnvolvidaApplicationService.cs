using Solid.Domain.Messaging.ParteEnvolvida;
using Solid.Infra.Enums;

namespace Solid.Domain.Interfaces.Application
{
    public interface IParteEnvolvidaApplicationService
    {
        List<ParteEnvolvidaResponse> BuscarPartesEnvolvidasPorTipoParte(TipoParte? tipo, Guid codigoCorretor);
        ParteEnvolvidaResponse Inserir(RegistrarParteEnvolvidaRequest request, Guid codigoCorretor);
        ParteEnvolvidaResponse Atualizar(AtualizarParteEnvolvidaRequest request);
    }
}
