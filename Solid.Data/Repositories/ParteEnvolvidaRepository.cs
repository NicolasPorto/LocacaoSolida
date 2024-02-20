using Microsoft.EntityFrameworkCore;
using Solid.Data.Context;
using Solid.Data.Repositories.Base;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Repositories;
using Solid.Infra.Enums;

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

        public List<ParteEnvolvida> BuscarPartesEnvolvidasPorTipoParte(TipoParte? tipo)
        {
            var sql = @"DECLARE @tipoParte INT = @p0

                        SELECT * FROM cad.ParteEnvolvida";

            if (tipo != null)
                sql += " WHERE TipoParte = @tipoParte";

            return SqlQuery<ParteEnvolvida>(sql, tipo).ToList();
        }
    }
}
