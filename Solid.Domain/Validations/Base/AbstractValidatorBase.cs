using FluentValidation;
using FluentValidation.Results;
using Solid.Infra.Exceptions;

namespace Solid.Domain.Validations.Base
{
    public class AbstractValidatorBase<T> : AbstractValidator<T>, IAbstractValidator<T>
    {
        public Task<ValidationResult> Validador(ValidationContext<T> request)
        {
            var validacao = base.ValidateAsync(request);
            if (validacao.Result.IsValid)
                return validacao;
            else
            {
                throw new SolidException(validacao.Result.Errors.First().ToString());
            }
        }
    }
}
