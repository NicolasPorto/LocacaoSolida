using Microsoft.AspNetCore.Http;
using Solid.Domain.Messaging.Corretor;

namespace Solid.Domain.Interfaces.Application
{
    public interface ICorretorApplicationService
    {
        List<CorretorResponse> BuscarCorretores();
        CorretorResponse InserirCorretor(RegistrarCorretorRequest request);
        CorretorResponse AtualizarCorretor(AtualizarCorretorRequest request);
        Task SalvarImagemPerfilAsync(IFormFileCollection file, Guid codigoCorretor);
        string ObterImagemCorretorPorCodigo(Guid codigoCorreor);
    }
}
