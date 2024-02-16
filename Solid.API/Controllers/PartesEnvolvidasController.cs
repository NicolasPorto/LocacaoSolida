using Microsoft.AspNetCore.Mvc;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Messaging.Base;
using Solid.Domain.Messaging.PartesEnvolvidas;
using Solid.Infra.Enums;
using Solid.Infra.Exceptions;

namespace Solid.API.Controllers
{
    public class PartesEnvolvidasController : ControllerBase
    {
        private readonly ILogger<PartesEnvolvidasController> _logger;
        private readonly IPartesEnvolvidasApplicationService _partesEnvolvidasApplicationService;

        public PartesEnvolvidasController(
            ILogger<PartesEnvolvidasController> logger, 
            IPartesEnvolvidasApplicationService partesEnvolvidasApplicationService)
        {
            _logger = logger;
            _partesEnvolvidasApplicationService = partesEnvolvidasApplicationService;
        }

        [HttpGet]
        public ActionResult<List<PartesEnvolvidasResponse>> BuscarPartesEnvolvidasPorTipoParte([FromQuery] TipoParte? tipo)
        {
            try
            {
                var response = _partesEnvolvidasApplicationService.BuscarPartesEnvolvidasPorTipoParte(tipo);

                if (response.Any())
                    return Ok(response);

                return BadRequest(response);
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
