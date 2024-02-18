using AutoMapper;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Interfaces.Repositories;
using Solid.Domain.Messaging.Imovel;
using Solid.Domain.Validations;
using Solid.Infra.Exceptions;
using System.Linq;

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

		public void AtualizarImovel(AtualizarImovelRequest atualizarImovelRequest)
		{
			var imovel = _imovelRepository.ObterPorCodigo(atualizarImovelRequest.Codigo) 
				?? throw new SolidException("Imóvel não encontrado.");

			imovel = _mapper.Map(atualizarImovelRequest, imovel);

			_imovelValidation.ValidateAsync(imovel);
			_imovelRepository.Update(imovel);
		}

		public List<Imovel> BuscarTodos()
		{
			return _imovelRepository.BuscarTodos();
		}

		public void RegistrarImovel(RegistrarImovelRequest registrarImovelRequest)
		{
			var imovel = new Imovel(registrarImovelRequest);

			_imovelValidation.ValidateAsync(imovel);
			_imovelRepository.Inserir(imovel);
		}
	}
}
