using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Solid.Domain.Interfaces.Data;

namespace Solid.Data.Context
{
    public class ConnectDbContext : DbContext, IDbProvider
    {
        private readonly IConfiguration _configuration;

        public ConnectDbContext(IConfiguration configuration, DbContextOptions options) : base(options)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var typeDatabase = _configuration["TypeDatabase"];
            var connectionString = _configuration.GetConnectionString(typeDatabase ?? "SqlServer");

            if (typeDatabase == "SqlServer")
            {
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        public DbContext GetDbContext()
        {
            return this;
        }
    }
}
