using Microsoft.AspNetCore.Mvc;

namespace Solid.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CorretorController : ControllerBase
    {
        private readonly ILogger<CorretorController> _logger;
        public CorretorController(ILogger<CorretorController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public ActionResult BuscarCorretores()
        {

        }
    }
}
