﻿using Microsoft.Extensions.DependencyInjection;
using Solid.Application.ApplicationServices;
using Solid.Data.Context;
using Solid.Data.Repositories;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Interfaces.Repositories;

namespace Solid.Crosscutting.DependencyInjection
{
    public static class DependencyInjectionConfig
    {
        public static void ConfigureDependencies(this IServiceCollection services)
        {
            services.AddTransient<ICorretorRepository, CorretorRepository>();
            services.AddTransient<ICorretorApplicationService, CorretorApplicationService>();
        }
    }
}