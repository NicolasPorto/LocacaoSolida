using Solid.Domain.Messaging.ParteEnvolvida;
using Solid.Domain.RawQuery;
using Solid.Infra.Enums;

namespace Solid.Domain.Interfaces.Application
{
    public interface IParteEnvolvidaApplicationService
    {
        List<ParteEnvolvidaResponse> BuscarPartesEnvolvidasPorTipoParte(TipoParte? tipo, Guid codigoCorretor);
        ParteEnvolvidaResponse Inserir(RegistrarParteEnvolvidaRequest request, Guid codigoCorretor);
        ParteEnvolvidaResponse Atualizar(AtualizarParteEnvolvidaRequest request);
        List<ComboParteEnvolvidaRawQueryResult> ObterCombo(TipoParte? tipo, Guid codigoCorretor);
    }
}
