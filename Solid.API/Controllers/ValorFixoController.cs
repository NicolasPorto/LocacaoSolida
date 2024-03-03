using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solid.API.Controllers.Base;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Messaging.Base;
using Solid.Domain.Messaging.ValorFixo;
using Solid.Infra.Exceptions;

namespace Solid.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ValorFixoController : ControllerBaseConfig
    {
        private readonly ILogger<ValorFixoController> _logger;
        private readonly IValorFixoApplicationService _valorFixoApplicationService;

        public ValorFixoController(
            ILogger<ValorFixoController> logger, 
            IValorFixoApplicationService valorFixoApplicationService)
        {
            _logger = logger;
            _valorFixoApplicationService = valorFixoApplicationService;
        }

        [HttpGet]
        public ActionResult<List<ValorFixoResponse>> BuscarTodos()
        {
            try
            {
                var response = _valorFixoApplicationService.BuscarTodos(ObterCodigoCorretorLogado());

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
        public ActionResult<ValorFixoResponse> InserirValorFixo(RegistrarValorFixoRequest request)
        {
            try
            {
                var response = _valorFixoApplicationService.Inserir(request, ObterCodigoCorretorLogado());

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

        [HttpPut]
        public ActionResult<ValorFixoResponse> AtualizarValorFixo(AtualizarValorFixoRequest request)
        {
            try
            {
                var response = _valorFixoApplicationService.Atualizar(request);

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
    }
}
