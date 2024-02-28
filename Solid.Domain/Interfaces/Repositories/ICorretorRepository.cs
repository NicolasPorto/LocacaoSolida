using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Repositories.Base;
using Solid.Domain.RawQuery;

namespace Solid.Domain.Interfaces.Repositories
{
    public interface ICorretorRepository : IBaseRepository<Corretor, Guid>
    {
        List<Corretor> BuscarTodosOsCorretores();
        Corretor? ObterCorretorPorCodigo(Guid codigo);
        void AtualizarCorretor(Corretor corretor);
        Corretor? ObterCorretorPorEmail(string email);
        ImagemPerfilRawQueryResult? ObterImagemCorretorPorCodigo(Guid codigo);
    }
}
