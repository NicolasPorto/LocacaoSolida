using AutoMapper;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Interfaces.Repositories;
using Solid.Domain.Messaging.Corretor;
using Solid.Domain.Validations;
using Solid.Infra.Exceptions;

namespace Solid.Application.ApplicationServices
{
    public class CorretorApplicationService : ICorretorApplicationService
    {
        private readonly ICorretorRepository _corretorRepository;
        private readonly CorretorValidation _corretorValidation;
        private readonly IMapper _mapper;

        public CorretorApplicationService(ICorretorRepository corretorRepository, CorretorValidation corretorValidation, IMapper mapper)
        {
            _corretorRepository = corretorRepository;
            _corretorValidation = corretorValidation;
            _mapper = mapper;
        }

        public List<CorretorResponse> BuscarCorretores()
        {
            var corretores = _corretorRepository.BuscarTodosOsCorretores();

            return _mapper.Map<List<CorretorResponse>>(corretores);
        }

        public CorretorResponse InserirCorretor(CorretorRequest request)
        {
            _corretorValidation.ValidateAsync(request);

            var corretor = Corretor.ConverterParaEntidade(request);

            _corretorRepository.Insert(corretor);

            return _mapper.Map<CorretorResponse>(corretor);
        }

        public CorretorResponse AtualizarCorretor(CorretorRequest request)
        {
            var corretor = _corretorRepository.ObterCorretorPorCodigo(request.Codigo) ?? throw new SolidException("Não foi possível encontrar o corretor informado.");

            _corretorValidation.ValidateAsync(request);

            _mapper.Map(request, corretor);

            _corretorRepository.AtualizarCorretor(corretor);

            return _mapper.Map<CorretorResponse>(corretor);
        }
    }
}
