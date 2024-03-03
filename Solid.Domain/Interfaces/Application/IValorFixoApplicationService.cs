using Solid.Domain.Messaging.ValorFixo;

namespace Solid.Domain.Interfaces.Application
{
    public interface IValorFixoApplicationService
    {
        List<ValorFixoResponse> BuscarTodos(Guid codigoCorretor);
        ValorFixoResponse Inserir(RegistrarValorFixoRequest request, Guid codigoCorretor);
        ValorFixoResponse Atualizar(AtualizarValorFixoRequest request);
    }
}
