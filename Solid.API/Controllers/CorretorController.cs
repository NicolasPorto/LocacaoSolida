﻿using Microsoft.AspNetCore.Mvc;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Messaging.Base;
using Solid.Domain.Messaging.Corretor;
using Solid.Infra.Exceptions;

namespace Solid.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CorretorController : ControllerBase
    {
        private readonly ICorretorApplicationService _corretorApplicationService;
        private readonly ILogger<CorretorController> _logger;

        public CorretorController(ICorretorApplicationService corretorApplicationService, ILogger<CorretorController> logger)
        {
            _corretorApplicationService = corretorApplicationService;
            _logger = logger;
        }

        [HttpGet("BuscarTodos")]
        public ActionResult<List<CorretorResponse>> BuscarCorretores()
        {
            try
            {
                var response = _corretorApplicationService.BuscarCorretores();

                if (response.Any())
                    return Ok(response);

                return BadRequest(response);
            }
            catch (SolidException ex)
            {
                return BadRequest(ResponseBase.ErrorHandled(ex));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ResponseBase.GenericError());
            }
        }
    }
}