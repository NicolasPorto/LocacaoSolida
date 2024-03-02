using Microsoft.EntityFrameworkCore;
using Solid.Domain.Entities;
using Solid.Domain.RawQuery;

namespace Solid.Data.Context
{
    public class ConnectDbContext : DbContext
    {
        public DbSet<Corretor> Corretor { get; set; }
		public DbSet<Imovel> Imovel { get; set; }
        public DbSet<ImagemPerfilRawQueryResult> ImagemPerfilRawQueryResult { get; set; }
        public DbSet<ComboParteEnvolvidaRawQueryResult> ComboParteEnvolvidaRawQueryResult { get; set; }
        public DbSet<ObterQtdPartesRawQueryResult> ObterQtdPartesRawQueryResult { get; set; }
        public DbSet<CountRawQueryResult> CountRawQueryResult { get; set; }

        public ConnectDbContext(DbContextOptions<ConnectDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Corretor>().HasKey(c => c.Id);
			modelBuilder.Entity<Imovel>().HasKey(c => c.Id);
            modelBuilder.Entity<ParteEnvolvida>().HasKey(c => c.Id);

            modelBuilder.Entity<ImagemPerfilRawQueryResult>().HasNoKey();
            modelBuilder.Entity<ComboParteEnvolvidaRawQueryResult>().HasNoKey();
            modelBuilder.Entity<ObterQtdPartesRawQueryResult>().HasNoKey();
            modelBuilder.Entity<CountRawQueryResult>().HasNoKey();

            base.OnModelCreating(modelBuilder);
        }
    }
}
