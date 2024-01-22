using FluentValidation;
using FluentValidation.Results;

namespace Solid.Domain.Validations.Base
{
    public interface IAbstractValidator<T>
    {
        public Task<ValidationResult> ValidateAsync(ValidationContext<T> context, CancellationToken cancellation = default);
        public Task<ValidationResult> Validador(ValidationContext<T> request);
    }
}
