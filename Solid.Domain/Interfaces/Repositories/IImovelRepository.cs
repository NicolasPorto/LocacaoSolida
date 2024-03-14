using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Repositories.Base;
using Solid.Domain.RawQuery;

namespace Solid.Domain.Interfaces.Repositories
{
	public interface IImovelRepository : IBaseRepository<Imovel, int>
	{
		void Inserir(Imovel entidadeImovel);
		List<Imovel> BuscarPorCodigoCorretor(Guid codigoCorretor);
		int ObterDadosDashboard();
		List<ComboImoveisRawQueryResult> ObterCombo(Guid codigoCorretor);
    }
}
