using FluentValidation;
using FluentValidation.Results;
using Solid.Domain.Entities;
using Solid.Domain.Validations.Base;
using Solid.Infra.Enums;

namespace Solid.Domain.Validations
{
    public class ValorFixoValidation : AbstractValidatorBase<ValorFixo>
    {
        public override Task<ValidationResult> ValidateAsync(ValidationContext<ValorFixo> request, CancellationToken cancellation = default)
        {
            RuleFor(x => x.Nome)
                .NotEmpty()
                .NotNull()
                .WithMessage("É obrigatório informar o nome do valor.");

            RuleFor(x => x.Valor)
                .NotEmpty()
                .NotNull()
                .NotEqual(0)
                .WithMessage("É obrigatório informar um valor.");

            RuleFor(x => x.PorcentagemValor)
                .NotEmpty()
                .NotNull()
                .WithMessage("É obrigatório informar a porcentagem do valor.");

            RuleFor(x => x.TipoValor)
                .Must(situacao => Enum.IsDefined(typeof(TipoValor), situacao))
                .WithMessage("O tipo do valor é inválido.");

            return Validador(request);
        }
    }
}
