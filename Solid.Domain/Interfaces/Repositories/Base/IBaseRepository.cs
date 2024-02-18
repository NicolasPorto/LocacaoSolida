using Solid.Domain.Models;

namespace Solid.Domain.Interfaces.Repositories.Base
{
    public interface IBaseRepository<TEntity, TIdType> where TEntity : EntityBase
    {
        IQueryable<TResult> SqlQuery<TResult>(string sqlQuery, params object[] parameters) where TResult : class;
        void Insert(TEntity entity);
        void Update(TEntity entity);
        public List<TEntity> BuscarTodos();
        TEntity? ObterPorCodigo(Guid codigo);

	}
}
