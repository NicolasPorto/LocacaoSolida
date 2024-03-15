using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solid.API.Controllers.Base;

namespace Solid.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ContratoLocacaoController : ControllerBaseConfig
    {
        private readonly ILogger<ContratoLocacaoController> _logger;

        public ContratoLocacaoController(ILogger<ContratoLocacaoController> logger)
        {
            _logger = logger;
        }
    }
}
