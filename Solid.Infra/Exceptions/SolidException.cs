using System.Net;

namespace Solid.Infra.Exceptions
{
    public class SolidException : Exception
    {
        public HttpStatusCode? HttpStatusCode { get; set; }
        public bool GeraEventLog { get; set; }

        public SolidException(bool geraEventLog = false)
        {
            GeraEventLog = geraEventLog;
        }

        public SolidException(string message, Exception innerException, bool geraEventLog = false) : base(message, innerException)
        {
            GeraEventLog = geraEventLog;
        }

        public SolidException(string message, bool geraEventLog = false) : base(message)
        {
            GeraEventLog = geraEventLog;
        }

        public SolidException(string message, HttpStatusCode statusCode, bool geraEventLog = false) : base(message)
        {
            GeraEventLog = geraEventLog;
            HttpStatusCode = statusCode;
        }
    }
}
