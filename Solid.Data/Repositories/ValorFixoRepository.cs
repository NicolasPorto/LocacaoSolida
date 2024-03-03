using Microsoft.EntityFrameworkCore;
using Solid.Data.Context;
using Solid.Data.Repositories.Base;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Repositories;

namespace Solid.Data.Repositories
{
    public class ValorFixoRepository : BaseRepository<ValorFixo, int>, IValorFixoRepository
    {
        public ValorFixoRepository(DbContextOptions<ConnectDbContext> options) : base(options)
        {
        }

        public void Inserir(ValorFixo valorFixo)
        {
            Insert(valorFixo);
        }

        public void Atualizar(ValorFixo valorFixo)
        {
            Update(valorFixo);
        }

        public List<ValorFixo> BuscarTodos(Guid codigoCorretor)
        {
            const string sql = @"DECLARE @codigoCorretor UNIQUEIDENTIFIER = @p0

                                 SELECT * FROM cad.ValorFixo
                                 WHERE CodigoCorretor = @codigoCorretor";

            return SqlQuery<ValorFixo>(sql, codigoCorretor).ToList();
        }
    }
}
