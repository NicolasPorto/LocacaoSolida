using Microsoft.EntityFrameworkCore;
using Solid.Data.Context;
using Solid.Data.Repositories.Base;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Repositories;
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
            base.Insert(parteEnvolvida);
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
    }
}
