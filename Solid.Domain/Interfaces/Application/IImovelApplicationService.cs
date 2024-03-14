using Solid.Domain.Entities;
using Solid.Domain.Messaging.Imovel;
using Solid.Domain.RawQuery;

namespace Solid.Domain.Interfaces.Application
{
	public interface IImovelApplicationService
	{
		void Inserir(RegistrarImovelRequest registrarImovelRequest, Guid codigoCorretor);
		void Atualizar(AtualizarImovelRequest atualizarImovelRequest);
		List<Imovel> BuscarTodos(Guid codigoCorretor);
		List<ComboImoveisRawQueryResult> ObterCombo(Guid codigoCorretor);

    }
}
