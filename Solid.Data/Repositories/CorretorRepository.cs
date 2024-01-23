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

        public Corretor? ObterCorretorPorCodigo(Guid codigo)
        {
            const string sql = @"DECLARE @codigoCorretor UNIQUEIDENTIFIER = @p0

                                 SELECT * FROM cad.Corretor
                                 WHERE Codigo = @codigoCorretor";

            return SqlQuery<Corretor>(sql, codigo)?.FirstOrDefault();
        }

        public void AtualizarCorretor(Corretor corretor)
        {
            const string sql = @"DECLARE @codigoCorretor UNIQUEIDENTIFIER = @p0

                                 UPDATE cad.Corretor
                                 SET (Nome,
                                      TipoPessoa,
                                      Situacao,
                                      NumeroCelular,
                                      Empresa,
                                      TipoCorretor)
                                  VALUES (@p1,
                                          @p2,
                                          @p3,
                                          @p4,
                                          @p5,
                                          @p6)";

            SqlQuery<Corretor>(sql, corretor.Codigo, 
                                    corretor.Nome, 
                                    corretor.TipoPessoa, 
                                    corretor.Situacao,
                                    corretor.NumeroCelular,
                                    corretor.Empresa,
                                    corretor.TipoCorretor)?.FirstOrDefault();
        }

        public Corretor? ObterCorretorPorEmail(string email)
        {
            const string sql = @"SELECT * FROM cad.Corretor
                                 WHERE Email = @p0";

            return SqlQuery<Corretor>(sql, email)?.FirstOrDefault();
        }
    }
}
