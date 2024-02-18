using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Repositories.Base;

namespace Solid.Domain.Interfaces.Repositories
{
	public interface IImovelRepository : IBaseRepository<Imovel, int>
	{
		void Inserir(Imovel entidadeImovel);
	}
}
