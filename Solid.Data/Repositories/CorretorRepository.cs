using Microsoft.EntityFrameworkCore;
using Solid.Data.Context;
using Solid.Data.Repositories.Base;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Repositories;
using Solid.Domain.RawQuery;

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

        public Corretor? ObterCorretorPorCodigo(Guid codigo)
        {
            const string sql = @"DECLARE @codigoCorretor UNIQUEIDENTIFIER = @p0

                                 SELECT * FROM cad.Corretor
                                 WHERE Codigo = @codigoCorretor";

            return SqlQuery<Corretor>(sql, codigo).ToList().FirstOrDefault();
        }

        public ImagemPerfilRawQueryResult? ObterImagemCorretorPorCodigo(Guid codigo)
        {
            const string sql = @"DECLARE @codigoCorretor UNIQUEIDENTIFIER = @p0

                                 SELECT FotoPerfil 
                                 FROM cad.Corretor
                                 WHERE Codigo = @codigoCorretor"
            ;

            return SqlQuery<ImagemPerfilRawQueryResult>(sql, codigo)?.ToList()?.FirstOrDefault();
        }

        public void AtualizarCorretor(Corretor corretor)
        {
            Update(corretor);
        }

        public Corretor? ObterCorretorPorEmail(string email)
        {
            const string sql = @"SELECT * FROM cad.Corretor
                                 WHERE Email = @p0";

            return SqlQuery<Corretor>(sql, email)?.FirstOrDefault();
        }
    }
}
