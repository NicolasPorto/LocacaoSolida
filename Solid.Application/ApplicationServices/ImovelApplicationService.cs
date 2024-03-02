using AutoMapper;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Interfaces.Repositories;
using Solid.Domain.Messaging.Imovel;
using Solid.Domain.Validations;
using Solid.Infra.Exceptions;

namespace Solid.Application.ApplicationServices
{
	public class ImovelApplicationService : IImovelApplicationService
	{
		private readonly IImovelRepository _imovelRepository;
		private readonly ImovelValidation _imovelValidation;
		private readonly IMapper _mapper;

		public ImovelApplicationService(IImovelRepository imovelRepository, ImovelValidation imovelValidation, IMapper mapper)
		{
			_imovelRepository = imovelRepository;
			_imovelValidation = imovelValidation;
			_mapper = mapper;
		} 

		public void Atualizar(AtualizarImovelRequest atualizarImovelRequest)
		{
			var imovel = _imovelRepository.ObterPorCodigo(atualizarImovelRequest.Codigo) 
				?? throw new SolidException("Imóvel não encontrado.");

			imovel = _mapper.Map(atualizarImovelRequest, imovel);

			_imovelValidation.ValidateAsync(imovel);
			_imovelRepository.Update(imovel);
		}

		public List<Imovel> BuscarTodos(Guid codigoCorretor)
		{
			return _imovelRepository.BuscarPorCodigoCorretor(codigoCorretor);
		}

		public void Inserir(RegistrarImovelRequest registrarImovelRequest, Guid codigoCorretor)
		{
			var imovel = new Imovel(registrarImovelRequest, codigoCorretor);

			_imovelValidation.ValidateAsync(imovel);
			_imovelRepository.Inserir(imovel);
		}
	}
}
