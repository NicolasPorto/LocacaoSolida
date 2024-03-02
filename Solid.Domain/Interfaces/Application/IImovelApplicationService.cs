using Solid.Domain.Entities;
using Solid.Domain.Messaging.Imovel;

namespace Solid.Domain.Interfaces.Application
{
	public interface IImovelApplicationService
	{
		void Inserir(RegistrarImovelRequest registrarImovelRequest, Guid codigoCorretor);
		void Atualizar(AtualizarImovelRequest atualizarImovelRequest);
		List<Imovel> BuscarTodos(Guid codigoCorretor);
	}
}
