using FluentValidation.AspNetCore;
using Microsoft.Extensions.DependencyInjection;
using Solid.Domain.Validations;
using System.Globalization;

namespace Solid.Crosscutting.DependencyInjection
{
    public static class FluentValidationConfig
    {
        public static void AddFluentValidationConfig(this IServiceCollection services)
        {
            services.AddFluentValidation(fv =>
            {
                fv.RegisterValidatorsFromAssemblyContaining<CorretorValidation>();
                fv.ValidatorOptions.LanguageManager.Culture = new CultureInfo("pt-BR");
            });
        }
    }
}
