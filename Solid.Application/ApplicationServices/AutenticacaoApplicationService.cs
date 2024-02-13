using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Application;
using Solid.Domain.Interfaces.Repositories;
using Solid.Domain.Messaging.Autenticacao;
using Solid.Infra.Exceptions;
using Solid.Infra.Extensions;
using Solid.Infra.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

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

            if (corretor.Situacao == Infra.Enums.Situacao.Inativo)
                throw new SolidException("Não foi possível realizar o login.");

            return new AutenticacaoResponse()
            {
                Token = GenerarToken(corretor),
                Codigo = corretor.Codigo
            };
        }

        public RecuperarInfoUsuarioResponse RecuperarInfoUsuario(string token)
        {
            if (string.IsNullOrEmpty(token))
                throw new SolidException("Não foi possível recuperar as informações do token.");

            return TokenHelper.DecodificarToken<RecuperarInfoUsuarioResponse>(token,
                _configuration.GetSection("JwtConfig:Key").Value!,
                "https://id.nickchapsas.com",
                "https://movies.niuckchapsas.com");
        }

        private string GenerarToken(Corretor corretor)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration.GetSection("JwtConfig:Key").Value!);

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new("codigocorretor", corretor.Codigo.ToString()),
                new("email", corretor.Email),
                new("nome", corretor.Nome),
                new("tipo", corretor.TipoCorretor.GetValueAsString())
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
