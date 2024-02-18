using Solid.Domain.Entities;
using Solid.Domain.Messaging.Imovel;

namespace Solid.Domain.Interfaces.Application
{
	public interface IImovelApplicationService
	{
		void RegistrarImovel(RegistrarImovelRequest registrarImovelRequest);
		void AtualizarImovel(AtualizarImovelRequest atualizarImovelRequest);
		List<Imovel> BuscarTodos();
	}
}
