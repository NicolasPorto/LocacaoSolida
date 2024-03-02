using AutoMapper;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Interfaces.Repositories;
using Solid.Domain.Messaging.ParteEnvolvida;
using Solid.Domain.RawQuery;
using Solid.Domain.Validations;
using Solid.Infra.Enums;
using Solid.Infra.Exceptions;

namespace Solid.Application.ApplicationServices
{
    public class ParteEnvolvidaApplicationService : IParteEnvolvidaApplicationService
    {
        private readonly IParteEnvolvidaRepository _parteEnvolvidaRepository;
        private readonly IMapper _mapper;
        private readonly ParteEnvolvidaValidation _parteEnvolvidaValidation;

        public ParteEnvolvidaApplicationService(
            IParteEnvolvidaRepository parteEnvolvidaRepository,
            IMapper mapper,
            ParteEnvolvidaValidation parteEnvolvidaValidation)
        {
            _parteEnvolvidaRepository = parteEnvolvidaRepository;
            _mapper = mapper;
            _parteEnvolvidaValidation = parteEnvolvidaValidation;
        }

        public List<ParteEnvolvidaResponse> BuscarPartesEnvolvidasPorTipoParte(TipoParte? tipo, Guid codigoCorretor)
        {
            var partes = _parteEnvolvidaRepository.BuscarPartesEnvolvidasPorTipoParte(tipo, codigoCorretor);

            return _mapper.Map<List<ParteEnvolvidaResponse>>(partes);
        }

        public List<ComboParteEnvolvidaRawQueryResult> ObterCombo(TipoParte? tipo, Guid codigoCorretor)
        {
            return _parteEnvolvidaRepository.ObterCombo(tipo, codigoCorretor);
        }

        public ParteEnvolvidaResponse Inserir(RegistrarParteEnvolvidaRequest request, Guid codigoCorretor)
        {
            var parteEnvolvida = new ParteEnvolvida(request, codigoCorretor);

            _parteEnvolvidaValidation.ValidateAsync(parteEnvolvida);

            _parteEnvolvidaRepository.Inserir(parteEnvolvida);

            return _mapper.Map<ParteEnvolvidaResponse>(parteEnvolvida);
        }

        public ParteEnvolvidaResponse Atualizar(AtualizarParteEnvolvidaRequest request)
        {
            var parteEnvolvida = _parteEnvolvidaRepository.ObterParteEnvolvidaPorCodigo(request.Codigo) ?? throw new SolidException("Não foi possível encontrar a parte envolvida informada.");

            _mapper.Map(request, parteEnvolvida);

            _parteEnvolvidaValidation.ValidateAsync(parteEnvolvida);

            _parteEnvolvidaRepository.Update(parteEnvolvida);

            return _mapper.Map<ParteEnvolvidaResponse>(parteEnvolvida);
        }
    }
}
