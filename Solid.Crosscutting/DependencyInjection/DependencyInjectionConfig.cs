using Microsoft.Extensions.DependencyInjection;
using Solid.Application.ApplicationServices;
using Solid.Data.Repositories;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Interfaces.Repositories;

namespace Solid.Crosscutting.DependencyInjection
{
    public static class DependencyInjectionConfig
    {
        public static void ConfigureDependencies(this IServiceCollection services)
        {
			services.AddTransient<ICorretorApplicationService, CorretorApplicationService>();
            services.AddTransient<IAutenticacaoApplicationService, AutenticacaoApplicationService>();
            services.AddTransient<IParteEnvolvidaApplicationService, ParteEnvolvidaApplicationService>();
			services.AddTransient<IImovelApplicationService, ImovelApplicationService>();
            services.AddTransient<IDashboardApplicationService, DashboardApplicationService>();
            services.AddTransient<IValorFixoApplicationService, ValorFixoApplicationService>();

            services.AddTransient<ICorretorRepository, CorretorRepository>();
            services.AddTransient<IImovelRepository, ImovelRepository>();
            services.AddTransient<IParteEnvolvidaRepository, ParteEnvolvidaRepository>();
            services.AddTransient<IValorFixoRepository, ValorFixoRepository>();
        }
    }
}
