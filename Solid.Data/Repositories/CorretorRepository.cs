using Solid.Data.Repositories.Base;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Data;
using Solid.Domain.Interfaces.Repositories;

namespace Solid.Data.Repositories
{
    public class CorretorRepository : BaseRepository<Corretor, Guid>, ICorretorRepository
    {
        public CorretorRepository(IDbProvider dbProvider) : base(dbProvider) { }
    }
}
