using Microsoft.AspNetCore.Mvc;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Messaging.Base;
using Solid.Domain.Messaging.ParteEnvolvida;
using Solid.Infra.Enums;
using Solid.Infra.Exceptions;

namespace Solid.API.Controllers
{
    public class ParteEnvolvidaController : ControllerBase
    {
        private readonly ILogger<ParteEnvolvidaController> _logger;
        private readonly IParteEnvolvidaApplicationService _parteEnvolvidaApplicationService;

        public ParteEnvolvidaController(
            ILogger<ParteEnvolvidaController> logger, 
            IParteEnvolvidaApplicationService parteEnvolvidaApplicationService)
        {
            _logger = logger;
            _parteEnvolvidaApplicationService = parteEnvolvidaApplicationService;
        }

        [HttpGet]
        public ActionResult<List<ParteEnvolvidaResponse>> BuscarPartesEnvolvidasPorTipoParte([FromQuery] TipoParte? tipo)
        {
            try
            {
                var response = _parteEnvolvidaApplicationService.BuscarPartesEnvolvidasPorTipoParte(tipo);

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

        [HttpPost]
        public ActionResult<ParteEnvolvidaResponse> InserirParteEnvolvida(ParteEnvolvidaRequest request)
        {
            try
            {
                var response = _parteEnvolvidaApplicationService.Inserir(request);

                if (response.Success)
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
