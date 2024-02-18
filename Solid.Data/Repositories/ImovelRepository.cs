using Microsoft.EntityFrameworkCore;
using Solid.Data.Context;
using Solid.Data.Repositories.Base;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Repositories;

namespace Solid.Data.Repositories
{
	public class ImovelRepository : BaseRepository<Imovel, int>, IImovelRepository
	{
		public ImovelRepository(DbContextOptions<ConnectDbContext> options) : base(options)
		{
		}

		public void Inserir(Imovel entidadeImovel)
		{
			base.Insert(entidadeImovel);
		}
	}
}
