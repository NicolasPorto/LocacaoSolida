using Microsoft.AspNetCore.Mvc;

namespace Solid.API.Controllers.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public class ControllerBaseConfig : ControllerBase
    {
        protected Guid ObterCodigoCorretorLogado()
        {
            string? token = Request.Headers.Authorization.FirstOrDefault()?.Split(" ").Last();

            if (token != null)
            {
                var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
                var parsedToken = tokenHandler.ReadJwtToken(token);

                var claims = parsedToken.Claims;
                var corretorClaim = claims.FirstOrDefault(c => c.Type == "codigocorretor");

                if (corretorClaim != null && Guid.TryParse(corretorClaim.Value, out Guid corretorId))
                    return corretorId;
            }

            return Guid.Empty;
        }
    }
}
