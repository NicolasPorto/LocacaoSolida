using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Repositories.Base;
using Solid.Domain.RawQuery;
using Solid.Infra.Enums;

namespace Solid.Domain.Interfaces.Repositories
{
    public interface IParteEnvolvidaRepository : IBaseRepository<ParteEnvolvida, int>
    {
        void Inserir(ParteEnvolvida parteEnvolvida);
        void Atualizar(ParteEnvolvida parteEnvolvida);
        List<ParteEnvolvida> BuscarPartesEnvolvidasPorTipoParte(TipoParte? tipo, Guid codigoCorretor);
        ParteEnvolvida? ObterParteEnvolvidaPorCodigo(Guid codigo);
        List<ComboParteEnvolvidaRawQueryResult> ObterCombo(TipoParte? tipo, Guid codigoCorretor);
        ObterQtdPartesRawQueryResult ObterDadosDashboard();
    }
}
