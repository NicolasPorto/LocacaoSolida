using Solid.Domain.Entities;
using Solid.Domain.Interfaces.Repositories.Base;

namespace Solid.Domain.Interfaces.Repositories
{
    public interface IValorFixoRepository : IBaseRepository<ValorFixo, int>
    {
        void Inserir(ValorFixo valorFixo);
        void Atualizar(ValorFixo valorFixo);
        List<ValorFixo> BuscarTodos(Guid codigoCorretor);
    }
}
