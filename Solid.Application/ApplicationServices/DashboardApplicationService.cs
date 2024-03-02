using Solid.Domain.Interfaces.Application;
using Solid.Domain.Interfaces.Repositories;
using Solid.Domain.Messaging.Dashboard;

namespace Solid.Application.ApplicationServices
{
    public class DashboardApplicationService : IDashboardApplicationService
    {
        private readonly IParteEnvolvidaRepository _parteEnvolvidaRepository;
        private readonly IImovelRepository _imovelRepository;

        public DashboardApplicationService(IParteEnvolvidaRepository parteEnvolvidaRepository, IImovelRepository imovelRepository)
        {
            _parteEnvolvidaRepository = parteEnvolvidaRepository;
            _imovelRepository = imovelRepository;
        }

        public DashboardDadosResponse ObterDados()
        {
            var qtdPartesEnvolvidas = _parteEnvolvidaRepository.ObterDadosDashboard();
            var qtdImoveis = _imovelRepository.ObterDadosDashboard();

            return new DashboardDadosResponse() 
            { 
                QtdFiadores = qtdPartesEnvolvidas.TotalFiador,
                QtdLocadores = qtdPartesEnvolvidas.TotalLocador,
                QtdLocatarios = qtdPartesEnvolvidas.TotalLocatario,
                QtdImoveis = qtdImoveis
            };
        }
    }
}
