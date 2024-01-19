using AutoMapper;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Interfaces.Repositories;
using Solid.Domain.Messaging.Corretor;

namespace Solid.Application.ApplicationServices
{
    public class CorretorApplicationService : ICorretorApplicationService
    {
        private readonly ICorretorRepository _corretorRepository;
        private readonly IMapper _mapper;

        public CorretorApplicationService(ICorretorRepository corretorRepository, IMapper mapper)
        {
            _corretorRepository = corretorRepository;
            _mapper = mapper;
        }

        public List<CorretorResponse> BuscarCorretores()
        {
            var corretores = _corretorRepository.BuscarTodosOsCorretores();

            return _mapper.Map<List<CorretorResponse>>(corretores);
        }

    }
}
