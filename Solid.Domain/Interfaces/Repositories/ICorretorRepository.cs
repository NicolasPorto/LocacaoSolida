using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Repositories.Base;

namespace Solid.Domain.Interfaces.Repositories
{
    public interface ICorretorRepository : IBaseRepository<Corretor, Guid>
    {
        List<Corretor> BuscarTodosOsCorretores();
        Corretor? ObterCorretorPorCodigo(Guid codigo);
        void AtualizarCorretor(Corretor corretor);
    }
}
