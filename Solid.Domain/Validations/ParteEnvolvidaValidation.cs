﻿using FluentValidation;
using FluentValidation.Results;
using Solid.Domain.Entities;
using Solid.Domain.Validations.Base;
using Solid.Infra.Enums;
using Solid.Infra.Extensions;

namespace Solid.Domain.Validations
{
    public class ParteEnvolvidaValidation : AbstractValidatorBase<ParteEnvolvida>
    {
        public override Task<ValidationResult> ValidateAsync(ValidationContext<ParteEnvolvida> request, CancellationToken cancellation = default)
        {
            RuleFor(x => x.Nome)
                .NotEmpty()
                .NotNull()
                .Length(3, 200)
                .WithMessage("É obrigatório informar o nome.");

            RuleFor(x => x.Email)
                .NotEmpty()
                .NotNull()
                .Length(10, 500)
                .EmailAddress(FluentValidation.Validators.EmailValidationMode.AspNetCoreCompatible)
                .WithMessage("É obrigatório informar um e-mail válido.");

            RuleFor(x => x.CPF.SomenteNumeros())
                .NotEmpty()
                .WithMessage("É obrigatório informar um cpf válido.")
                .NotNull()
                .WithMessage("É obrigatório informar um cpf válido.")
                .MaximumLength(11)
                .WithMessage("É obrigatório informar um cpf válido.");

            RuleFor(x => x.TipoParte)
                .Must(tipo => Enum.IsDefined(typeof(TipoParte), tipo))
                    .WithMessage("O tipo parte é inválido.");

            RuleFor(x => x.EstadoCivil)
                .Must(tipo => Enum.IsDefined(typeof(EstadoCivil), tipo))
                    .WithMessage("O Estado Civil é inválido.");

            RuleFor(x => x.Profissao)
                .MaximumLength(200)
                .WithMessage("A profissão pode ter no máximo 200 caracteres.");

            RuleFor(x => x.Nacionalidade)
                .NotEmpty()
                .NotNull()
                .Length(1, 200)
                .WithMessage("É obrigatório informar a nacionalidade.");

            RuleFor(x => x.Empresa)
                .MaximumLength(200)
                .WithMessage("A empresa pode ter no máximo 200 caracteres.");

            RuleFor(x => x.NumeroCelular!.SomenteNumeros())
                .MaximumLength(11)
                .WithMessage("É obrigatório informar um numero celular válido.");

            When(x => x.PossuiConjuge, () =>
            {
                RuleFor(x => x.Conjuge)
                .NotEmpty()
                .NotNull()
                .Length(3, 200)
                .WithMessage("É obrigatório informar o cônjuge.");

                RuleFor(x => x.CPFConjuge!.SomenteNumeros())
                .NotEmpty()
                .WithMessage("É obrigatório informar um cpf do cônjuge válido.")
                .NotNull()
                .WithMessage("É obrigatório informar um cpf do cônjuge válido.")
                .MaximumLength(11)
                .WithMessage("É obrigatório informar um cpf do cônjuge válido.");
            });

            return Validador(request);
        }
    }
}
