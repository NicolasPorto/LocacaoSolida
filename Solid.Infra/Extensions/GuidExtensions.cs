namespace Solid.Infra.Extensions
{
    public static class GuidExtensions
    {
        public static bool GuidIsNullOrEmpty(this Guid? guid)
        {
            return guid is null || guid == Guid.Empty;
        }

        public static bool GuidIsNullOrEmpty(this Guid guid)
        {
            return guid == Guid.Empty;
        }

        public static Guid TryParseGuid(this string guid)
        {
            _ = Guid.TryParse(guid, out var guidParsed);

            return guidParsed;
        }
    }
}
