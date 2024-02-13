using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Solid.Infra.Helpers
{
    public static class TokenHelper
    {
        public static T DecodificarToken<T>(string token, string key, string issuer, string audience) where T : class, new()
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var keyBytes = Encoding.UTF8.GetBytes(key);

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
                ValidateIssuer = true,
                ValidIssuer = issuer,
                ValidateAudience = true,
                ValidAudience = audience,
                RequireExpirationTime = true,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);

            var claims = ((JwtSecurityToken)securityToken).Claims;

            var obj = new T();
            var properties = typeof(T).GetProperties();

            foreach (var property in properties)
            {
                var claim = claims.FirstOrDefault(c => c.Type == property.Name.ToLower());
                if (claim != null)
                {
                    property.SetValue(obj, Convert.ChangeType(claim.Value, property.PropertyType));
                }
            }

            return obj;
        }
    }
}
