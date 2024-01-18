using Microsoft.EntityFrameworkCore;
using Solid.Domain.Interfaces.Data;
using Solid.Domain.Interfaces.Repositories.Base;

namespace Solid.Data.Repositories.Base
{
    public abstract class BaseRepository<TEntity, TIdType> : IBaseRepository<TEntity, TIdType> where TEntity : class
    {
        private readonly DbContext _dbContext;

        protected BaseRepository(IDbProvider dbProvider)
        {
            _dbContext = dbProvider.GetDbContext();
        }

        public IQueryable<TResult> SqlQuery<TResult>(string sqlQuery, params object[] parameters) where TResult : class
        {
            return _dbContext.Set<TResult>().FromSqlRaw(sqlQuery, parameters).AsNoTracking().AsQueryable();
        }
    }
}
