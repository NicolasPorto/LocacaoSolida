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
	public class ImoveisController : ControllerBaseConfig
    {
		private ILogger<ImoveisController> _logger;
		private readonly IImovelApplicationService _imovelApplicationService;

		public ImoveisController(IImovelApplicationService imoveisApplicationService, ILogger<ImoveisController> logger)
		{
			_imovelApplicationService = imoveisApplicationService;
			_logger = logger;
		}

		[HttpPost]
		public ActionResult RegistrarImovel(RegistrarImovelRequest registrarImovelRequest)
		{
			try
			{
				_imovelApplicationService.RegistrarImovel(registrarImovelRequest);

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

		[HttpGet]
		public ActionResult<List<Imovel>> BuscarTodos()
		{
			try
			{
				return Ok(_imovelApplicationService.BuscarTodos());
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
				_imovelApplicationService.AtualizarImovel(atualizarImovelRequest);

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
