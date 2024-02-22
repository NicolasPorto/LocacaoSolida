using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solid.API.Controllers.Base;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Messaging.Base;
using Solid.Domain.Messaging.ParteEnvolvida;
using Solid.Infra.Enums;
using Solid.Infra.Exceptions;

namespace Solid.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ParteEnvolvidaController : ControllerBaseConfig
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
        public ActionResult<List<ParteEnvolvidaResponse>> BuscarPartesEnvolvidasPorTipoParte([FromQuery] TipoParte? tipoParte)
        {
            try
            {
                var response = _parteEnvolvidaApplicationService.BuscarPartesEnvolvidasPorTipoParte(tipoParte, ObterCodigoCorretorLogado());

                return Ok(response);
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
                var response = _parteEnvolvidaApplicationService.Inserir(request, ObterCodigoCorretorLogado());

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
