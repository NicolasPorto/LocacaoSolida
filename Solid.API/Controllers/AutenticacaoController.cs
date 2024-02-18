using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Messaging.Autenticacao;
using Solid.Domain.Messaging.Base;
using Solid.Infra.Exceptions;

namespace Solid.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AutenticacaoController : ControllerBase
    {
        private readonly IAutenticacaoApplicationService _autenticacaoApplicationService;
        private readonly ILogger<CorretorController> _logger;

        public AutenticacaoController(IAutenticacaoApplicationService autenticacaoApplicationService, ILogger<CorretorController> logger)
        {
            _autenticacaoApplicationService = autenticacaoApplicationService;
            _logger = logger;
        }

        [HttpPost]
        public ActionResult<AutenticacaoResponse> Autenticar(AutenticacaoRequest request)
           {
            try
            {
                var response = _autenticacaoApplicationService.Autenticar(request);

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

        [Authorize]
        [HttpGet("RecuperarInfoUsuario")]
        public ActionResult<RecuperarInfoUsuarioResponse> RecuperarInfoUsuario(string token)
        {
            try
            {
                var response = _autenticacaoApplicationService.RecuperarInfoUsuario(token);

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
