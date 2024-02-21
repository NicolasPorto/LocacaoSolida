using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solid.API.Controllers.Base;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Messaging.Base;
using Solid.Domain.Messaging.Corretor;
using Solid.Infra.Exceptions;

namespace Solid.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CorretorController : ControllerBaseConfig
    {
        private readonly ICorretorApplicationService _corretorApplicationService;
        private readonly ILogger<CorretorController> _logger;

        public CorretorController(ICorretorApplicationService corretorApplicationService, ILogger<CorretorController> logger)
        {
            _corretorApplicationService = corretorApplicationService;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<List<CorretorResponse>> BuscarCorretores()
        {
            try
            {
                var response = _corretorApplicationService.BuscarCorretores();

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
        public ActionResult<CorretorResponse> InserirCorretor(CorretorRequest request)
        {
            try
            {
                var response = _corretorApplicationService.InserirCorretor(request);

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

        [HttpPut]
        public ActionResult<CorretorResponse> AtualizarCorretor(CorretorRequest request)
        {
            try
            {
                var response = _corretorApplicationService.AtualizarCorretor(request);

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

        [HttpPost]
        public async Task<IActionResult> SalvarImagemPerfil()
        {
            try
            {
                await _corretorApplicationService.SalvarImagemPerfilAsync(Request.Form.Files, ObterCodigoCorretorLogado());

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
