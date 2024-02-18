using FluentValidation;
using FluentValidation.Results;
using Solid.Domain.Entities;
using Solid.Domain.Messaging.Corretor;
using Solid.Domain.Messaging.Imovel;
using Solid.Domain.Validations.Base;
using Solid.Infra.Enums;

namespace Solid.Domain.Validations
{
	public class ImovelValidation : AbstractValidatorBase<Imovel>
	{
		public override Task<ValidationResult> ValidateAsync(ValidationContext<Imovel> request, CancellationToken cancellation = default)
		{
			RuleFor(x => x.Logradouro)
				.NotEmpty()
				.NotNull()
				.Length(10, 500)
				.WithMessage("É obrigatório informar um logradouro válido.");

			RuleFor(x => x.NumeroLogradouro)
				.NotNull()
				.NotEmpty()
				.WithMessage("É obrigatório informar um número para o logradouro válido.");

			RuleFor(x => x.Bairro)
				.NotEmpty()
				.NotNull()
				.Length(3, 200)
				.WithMessage("É obrigatório informar o nome do bairro.");


			RuleFor(x => x.TipoImovel)
				.Must(tipoImovel => Enum.IsDefined(typeof(TipoImovel), tipoImovel))
				.WithMessage("Tipo do Imovel inválido.");

			RuleFor(x => x.Situacao)
				.Must(situacao => Enum.IsDefined(typeof(SituacaoImovel), situacao))
				.WithMessage("Situacao inválida.");

			return Validador(request);
		}
	}
}
