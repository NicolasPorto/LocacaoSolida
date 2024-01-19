namespace Solid.Domain.Validations.Base
{
    public class Response
    {
        public Response()
        {
            Report = new List<Report>();
        }

        public Response(List<Report> report)
        {
            Report = report;
        }

        public Response(Report report) : this(new List<Report>() { report })
        {
        }

        public List<Report> Report { get; set; }

        public static Response<T> OK<T>(T date) => new Response<T>(date);
        public static Response OK() => new Response();
        public static Response Unprocessable(List<Report> reports) => new Response(reports);
        public static Response Unprocessable(Report report) => new Response(report);
    }

    public class Response<T> : Response
    {
        public Response()
        {
        }

        public Response(T date, List<Report>? reports = null) : base(reports)
        {
            Date = date;
        }

        public T Date { get; set; }
    }
}
