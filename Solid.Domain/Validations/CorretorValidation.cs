using FluentValidation;
using FluentValidation.Results;
using Solid.Domain.Messaging.Corretor;
using Solid.Domain.Validations.Base;
using Solid.Infra.Enums;
using Solid.Infra.Extensions;

namespace Solid.Domain.Validations
{
    public class CorretorValidation : AbstractValidatorBase<CorretorRequest>
    {
        public override Task<ValidationResult> ValidateAsync(ValidationContext<CorretorRequest> request, CancellationToken cancellation = default)
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .NotNull()
                .Length(10, 500)
                .EmailAddress(FluentValidation.Validators.EmailValidationMode.AspNetCoreCompatible)
                .WithMessage("É obrigatório informar um e-mail válido.");

            RuleFor(x => x.DocumentoFederal.SomenteNumeros())
                .NotEmpty()
                .WithMessage("É obrigatório informar um documento federal válido.")
                .NotNull()
                .WithMessage("É obrigatório informar um documento federal válido.")
                .MaximumLength(14)
                .WithMessage("É obrigatório informar um documento federal válido.");

            RuleFor(x => x.Nome)
                .NotEmpty()
                .NotNull()
                .Length(3, 200)
                .WithMessage("É obrigatório informar o nome do corretor.");

            RuleFor(x => x.TipoPessoa)
                .Must(tipo => Enum.IsDefined(typeof(TipoPessoa), tipo))
                    .WithMessage("O tipo pessoa é inválido.");

            RuleFor(x => x.Situacao)
                .Must(situacao => Enum.IsDefined(typeof(Situacao), situacao))
                    .WithMessage("A situação é inválida.");

            RuleFor(x => x.NumeroCelular.SomenteNumeros())
                .MaximumLength(11)
                .WithMessage("É obrigatório informar um numero celular válido.");

            RuleFor(x => x.Empresa)
                .NotEmpty()
                .NotNull()
                .MaximumLength(200)
                .WithMessage("É obrigatório informar a empresa do corretor.");

            RuleFor(x => x.TipoCorretor)
                .Must(tipo => Enum.IsDefined(typeof(TipoCorretor), tipo))
                    .WithMessage("O tipo do corretor é inválido.");

            return Validador(request);
        }
    }
}
