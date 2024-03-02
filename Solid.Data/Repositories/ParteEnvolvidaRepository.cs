using Microsoft.EntityFrameworkCore;
using Solid.Data.Context;
using Solid.Data.Repositories.Base;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Repositories;
using Solid.Domain.RawQuery;
using Solid.Infra.Enums;
using Solid.Infra.Extensions;
using Solid.Infra.Helpers;

namespace Solid.Data.Repositories
{
    public class ParteEnvolvidaRepository : BaseRepository<ParteEnvolvida, int>, IParteEnvolvidaRepository
    {
        public ParteEnvolvidaRepository(DbContextOptions<ConnectDbContext> options) : base(options)
        {
        }

        public void Inserir(ParteEnvolvida parteEnvolvida)
        {
            Insert(parteEnvolvida);
        }

        public void Atualizar(ParteEnvolvida parteEnvolvida)
        {
            Update(parteEnvolvida);
        }

        public List<ParteEnvolvida> BuscarPartesEnvolvidasPorTipoParte(TipoParte? tipo, Guid codigoCorretor)
        {
            const string sql = @"DECLARE @tipoParte INT = @p0,
                                         @codigoCorretor UNIQUEIDENTIFIER = @p1

                                 SELECT * FROM cad.ParteEnvolvida";

            var query = new SQLQueryBuilder(sql);

            if (tipo != null)
                query.AddCondition(" TipoParte = @tipoParte");

            if (!codigoCorretor.GuidIsNullOrEmpty())
                query.AddCondition(" CodigoCorretor = @codigoCorretor");

            return SqlQuery<ParteEnvolvida>(query.ToString(), tipo, codigoCorretor).ToList();
        }

        public ParteEnvolvida? ObterParteEnvolvidaPorCodigo(Guid codigo)
        {
            const string sql = @"DECLARE @codigo UNIQUEIDENTIFIER = @p0

                                 SELECT * FROM cad.ParteEnvolvida
                                 WHERE Codigo = @codigo";

            return SqlQuery<ParteEnvolvida>(sql, codigo).ToList().FirstOrDefault();
        }

        public List<ComboParteEnvolvidaRawQueryResult> ObterCombo(TipoParte? tipo, Guid codigoCorretor)
        {
            const string sql = @"DECLARE @tipoParte INT = @p0,
                                         @codigoCorretor UNIQUEIDENTIFIER = @p1

                                 SELECT Codigo, 
                                        Nome 
                                 FROM cad.ParteEnvolvida";

            var query = new SQLQueryBuilder(sql);

            if (tipo != null)
                query.AddCondition(" TipoParte = @tipoParte");

            if (!codigoCorretor.GuidIsNullOrEmpty())
                query.AddCondition(" CodigoCorretor = @codigoCorretor");

            return SqlQuery<ComboParteEnvolvidaRawQueryResult>(query.ToString(), tipo, codigoCorretor).ToList();
        }

        public ObterQtdPartesRawQueryResult ObterDadosDashboard()
        {
            const string sql = @"DECLARE @locador INT = @p0,
                                         @locatario INT = @p1,
                                         @fiador INT = @p1

                                 SELECT 
                                     SUM(CASE WHEN TipoParte = @locador THEN 1 ELSE 0 END) AS TotalLocador,
                                     SUM(CASE WHEN TipoParte = @locatario THEN 1 ELSE 0 END) AS TotalLocatario,
                                     SUM(CASE WHEN TipoParte = @fiador THEN 1 ELSE 0 END) AS TotalFiador
                                 FROM cad.ParteEnvolvida;";

            return SqlQuery<ObterQtdPartesRawQueryResult>(sql, TipoParte.Locador, TipoParte.Locatario, TipoParte.Fiador)?.ToList()?.FirstOrDefault()!;
        }
    }
}
