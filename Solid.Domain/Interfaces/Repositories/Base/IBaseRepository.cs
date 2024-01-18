namespace Solid.Domain.Interfaces.Repositories.Base
{
    public interface IBaseRepository<TEntity, TIdType> where TEntity : class
    {
        IQueryable<TResult> SqlQuery<TResult>(string sqlQuery, params object[] parameters) where TResult : class;
    }
}
