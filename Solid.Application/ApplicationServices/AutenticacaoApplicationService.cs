using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Interfaces.Repositories;
using Solid.Domain.Messaging.Autenticacao;
using Solid.Infra.Exceptions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Solid.Application.ApplicationServices
{
    public class AutenticacaoApplicationService : IAutenticacaoApplicationService
    {
        private readonly ICorretorRepository _corretorRepository;
        private readonly IConfiguration _configuration;
        private static readonly TimeSpan TokenLifetime = TimeSpan.FromHours(8);

        public AutenticacaoApplicationService(ICorretorRepository corretorRepository, IConfiguration configuration)
        {
            _corretorRepository = corretorRepository;
            _configuration = configuration;
        }

        public AutenticacaoResponse Autenticar(AutenticacaoRequest request)
        {
            var corretor = _corretorRepository.ObterCorretorPorEmail(request.Email) ?? throw new SolidException("E-mail ou senha inválidos.");

            if (corretor.Senha != request.Senha)
                throw new SolidException("E-mail ou senha inválidos.");

            return new AutenticacaoResponse()
            {
                Token = GenerarToken(corretor),
                Codigo = corretor.Codigo
            };
        }

        private string GenerarToken(Corretor corretor)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration.GetSection("JwtConfig:Key").Value!);

            var claims = new List<Claim>
            { 
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new("codigo-corretor", corretor.Codigo.ToString()),
                new("email", corretor.Email)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
               Subject = new ClaimsIdentity(claims),
               Expires = DateTime.UtcNow.Add(TokenLifetime),
               Issuer = "https://id.nickchapsas.com",
               Audience = "https://movies.niuckchapsas.com",
               SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
