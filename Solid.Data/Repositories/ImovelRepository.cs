using Microsoft.EntityFrameworkCore;
using Solid.Data.Context;
using Solid.Data.Repositories.Base;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Repositories;
using Solid.Domain.RawQuery;

namespace Solid.Data.Repositories
{
    public class ImovelRepository : BaseRepository<Imovel, int>, IImovelRepository
	{
		public ImovelRepository(DbContextOptions<ConnectDbContext> options) : base(options)
		{
		}

		public void Inserir(Imovel entidadeImovel)
		{
            Insert(entidadeImovel);
		}

        public List<Imovel> BuscarPorCodigoCorretor(Guid codigoCorretor)
        {
            const string sql = @"DECLARE @codigoCorretor UNIQUEIDENTIFIER = @p0

                                 SELECT * 
                                 FROM cad.Imovel WITH(NOLOCK)
                                 WHERE CodigoCorretor = @codigoCorretor";

            return SqlQuery<Imovel>(sql.ToString(), codigoCorretor).ToList();
        }

        public List<ComboImoveisRawQueryResult> ObterCombo(Guid codigoCorretor)
        {
            const string sql = @"DECLARE @codigoCorretor UNIQUEIDENTIFIER = @p0

                                 SELECT Codigo,
                                        CEP,
                                        Logradouro,
                                        NumeroLogradouro,
                                        Bairro,
                                        Cidade
                                 FROM cad.Imovel WITH(NOLOCK)
                                 WHERE CodigoCorretor = @codigoCorretor";

            return SqlQuery<ComboImoveisRawQueryResult>(sql.ToString(), codigoCorretor).ToList();
        }

        public int ObterDadosDashboard()
        {
            const string sql = @"SELECT 
                                     COUNT(0) AS Result
                                 FROM cad.Imovel WITH(NOLOCK)";

            return SqlQuery<CountRawQueryResult>(sql).ToList().FirstOrDefault()!.Result;
        }
    }
}
