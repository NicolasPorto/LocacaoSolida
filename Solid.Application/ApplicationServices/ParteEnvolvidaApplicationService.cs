using AutoMapper;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Interfaces.Repositories;
using Solid.Domain.Messaging.ParteEnvolvida;
using Solid.Domain.Validations;
using Solid.Infra.Enums;

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

        public List<ParteEnvolvidaResponse> BuscarPartesEnvolvidasPorTipoParte(TipoParte? tipo)
        {
            var partes = _parteEnvolvidaRepository.BuscarPartesEnvolvidasPorTipoParte(tipo);

            return _mapper.Map<List<ParteEnvolvidaResponse>>(partes);
        }

        public ParteEnvolvidaResponse Inserir(ParteEnvolvidaRequest request)
        {
            _parteEnvolvidaValidation.ValidateAsync(request);

            var parteEnvolvida = ParteEnvolvida.ConverterParaEntidade(request);

            _parteEnvolvidaRepository.Inserir(parteEnvolvida);

            return _mapper.Map<ParteEnvolvidaResponse>(parteEnvolvida);
        }
    }
}
