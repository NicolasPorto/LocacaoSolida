using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solid.API.Controllers.Base;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Messaging.Base;
using Solid.Domain.Messaging.Dashboard;
using Solid.Infra.Exceptions;

namespace Solid.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class DashboardController : ControllerBaseConfig
    {
        private readonly IDashboardApplicationService _dashboardApplicationService;
        private readonly ILogger<DashboardController> _logger;

        public DashboardController(IDashboardApplicationService dashboardApplicationService, ILogger<DashboardController> logger)
        {
            _dashboardApplicationService = dashboardApplicationService;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<DashboardDadosResponse> ObterDados()
        {
            try
            {
                var response = _dashboardApplicationService.ObterDados();

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
