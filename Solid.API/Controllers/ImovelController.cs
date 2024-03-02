using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solid.API.Controllers.Base;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Messaging.Base;
using Solid.Domain.Messaging.Imovel;
using Solid.Infra.Exceptions;

namespace Solid.API.Controllers
{
    [Authorize]
	[ApiController]
	[Route("[controller]")]
	public class ImovelController : ControllerBaseConfig
    {
		private ILogger<ImovelController> _logger;
		private readonly IImovelApplicationService _imovelApplicationService;

		public ImovelController(IImovelApplicationService imoveisApplicationService, ILogger<ImovelController> logger)
		{
			_imovelApplicationService = imoveisApplicationService;
			_logger = logger;
		}

        [HttpGet]
        public ActionResult<List<Imovel>> BuscarTodos()
        {
            try
            {
                return Ok(_imovelApplicationService.BuscarTodos(ObterCodigoCorretorLogado()));
            }
            catch (SolidException ex)
            {
                return BadRequest(ResponseBase.ErrorHandled(ex));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ResponseBase.GenericError());
            }
        }

        [HttpPost]
		public ActionResult InserirImovel(RegistrarImovelRequest registrarImovelRequest)
		{
			try
			{
				_imovelApplicationService.Inserir(registrarImovelRequest, ObterCodigoCorretorLogado());

				return Ok();
			}
			catch (SolidException ex)
			{
				return BadRequest(ResponseBase.ErrorHandled(ex));
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, ex.Message);
				return StatusCode(StatusCodes.Status500InternalServerError, ResponseBase.GenericError());
			}
		}

		[HttpPut]
		public ActionResult  AtualizarImovel(AtualizarImovelRequest atualizarImovelRequest)
		{
			try
			{
				_imovelApplicationService.Atualizar(atualizarImovelRequest);

				return Ok();
			}
			catch (SolidException ex)
			{
				return BadRequest(ResponseBase.ErrorHandled(ex));
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, ex.Message);
				return StatusCode(StatusCodes.Status500InternalServerError, ResponseBase.GenericError());
			}
		}
	}
}
