using Microsoft.EntityFrameworkCore;
using Solid.Domain.Entities;
using Solid.Domain.RawQuery;

namespace Solid.Data.Context
{
    public class ConnectDbContext : DbContext
    {
        public ConnectDbContext(DbContextOptions<ConnectDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Corretor>().HasKey(c => c.Id);
			modelBuilder.Entity<Imovel>().HasKey(c => c.Id);
            modelBuilder.Entity<ParteEnvolvida>().HasKey(c => c.Id);
            modelBuilder.Entity<ValorFixo>().HasKey(c => c.Id);

            modelBuilder.Entity<ImagemPerfilRawQueryResult>().HasNoKey();
            modelBuilder.Entity<ComboParteEnvolvidaRawQueryResult>().HasNoKey();
            modelBuilder.Entity<ComboImoveisRawQueryResult>().HasNoKey();
            modelBuilder.Entity<ObterQtdPartesRawQueryResult>().HasNoKey();
            modelBuilder.Entity<CountRawQueryResult>().HasNoKey();

            base.OnModelCreating(modelBuilder);
        }
    }
}
