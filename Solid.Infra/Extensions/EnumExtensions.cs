namespace Solid.Infra.Extensions
{
    public static class EnumExtensions
    {
        public static string GetValueAsString<T>(this T enumerationValue)
            where T : Enum
        {
            return enumerationValue.ToString("D");
        }
    }
}
