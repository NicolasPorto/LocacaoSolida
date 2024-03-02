using Solid.Domain.Messaging.Base;

namespace Solid.Domain.Messaging.Dashboard
{
    public class DashboardDadosResponse : ResponseBase
    {
        public int QtdLocadores { get; set; }
        public int QtdLocatarios { get; set; }
        public int QtdFiadores { get; set; }
        public int QtdImoveis { get; set; }
    }
}
