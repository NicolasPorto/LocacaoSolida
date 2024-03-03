using AutoMapper;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Interfaces.Repositories;
using Solid.Domain.Messaging.ValorFixo;
using Solid.Domain.Validations;
using Solid.Infra.Exceptions;

namespace Solid.Application.ApplicationServices
{
    public class ValorFixoApplicationService : IValorFixoApplicationService
    {
        private readonly IMapper _mapper;
        private readonly IValorFixoRepository _valorFixoRepository;
        private readonly ValorFixoValidation _valorFixoValidation;

        public ValorFixoApplicationService(
            IMapper mapper, 
            IValorFixoRepository valorFixoRepository,
            ValorFixoValidation valorFixoValidation) 
        { 
            _mapper = mapper;
            _valorFixoRepository = valorFixoRepository;
            _valorFixoValidation = valorFixoValidation;
        }

        public List<ValorFixoResponse> BuscarTodos(Guid codigoCorretor)
        {
            var valores = _valorFixoRepository.BuscarTodos(codigoCorretor);

            return _mapper.Map<List<ValorFixoResponse>>(valores);
        }

        public ValorFixoResponse Inserir(RegistrarValorFixoRequest request, Guid codigoCorretor)
        {
            var valorFixo = new ValorFixo(request, codigoCorretor);

            _valorFixoValidation.ValidateAsync(valorFixo);

            _valorFixoRepository.Inserir(valorFixo);

            return _mapper.Map<ValorFixoResponse>(valorFixo);
        }

        public ValorFixoResponse Atualizar(AtualizarValorFixoRequest request)
        {
            var valorFixo = _valorFixoRepository.ObterPorCodigo(request.Codigo) ?? throw new SolidException("Não foi possível encontrar o registro.");

            _mapper.Map(request, valorFixo);

            _valorFixoValidation.ValidateAsync(valorFixo);

            _valorFixoRepository.Atualizar(valorFixo);

            return _mapper.Map<ValorFixoResponse>(valorFixo);
        }
    }
}
