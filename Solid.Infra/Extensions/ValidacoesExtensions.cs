using System.Text.RegularExpressions;

namespace Solid.Infra.Extensions
{
    public static class ValidacoesExtensions
    {
        public static string SomenteNumeros(this string? texto)
        {
            return string.IsNullOrWhiteSpace(texto) ? string.Empty : string.Join("", Regex.Split(texto, @"[^\d]"));
        }
    }
}
