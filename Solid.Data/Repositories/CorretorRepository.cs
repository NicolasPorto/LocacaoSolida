using Microsoft.EntityFrameworkCore;
using Solid.Data.Context;
using Solid.Data.Repositories.Base;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Repositories;

namespace Solid.Data.Repositories
{
    public class CorretorRepository : BaseRepository<Corretor, Guid>, ICorretorRepository
    {
        public CorretorRepository(DbContextOptions<ConnectDbContext> options) : base(options)
        {
        }

        public List<Corretor> BuscarTodosOsCorretores()
        {
            const string sql = @"SELECT * FROM cad.Corretor";

            return SqlQuery<Corretor>(sql).ToList();
        }
    }
}
