using Microsoft.EntityFrameworkCore;
using Solid.Data.Context;
using Solid.Domain.Interfaces.Repositories.Base;
using Solid.Domain.Models;

namespace Solid.Data.Repositories.Base
{
    public abstract class BaseRepository<TEntity, TIdType> : IBaseRepository<TEntity, TIdType> where TEntity : EntityBase
	{
        private readonly DbContext _dbContext;

        protected BaseRepository(DbContextOptions<ConnectDbContext> options)
        {
            _dbContext = new ConnectDbContext(options);
        }

        public IQueryable<TResult> SqlQuery<TResult>(string sqlQuery, params object[] parameters) where TResult : class
        {
            return _dbContext.Set<TResult>().FromSqlRaw(sqlQuery, parameters).AsNoTracking().AsQueryable();
        }

        public void Insert(TEntity entity)
        {
            _dbContext.Set<TEntity>().Add(entity);
            _dbContext.SaveChanges();
        }

        public void Update(TEntity entity)
        {
            _dbContext.Set<TEntity>().Update(entity);
            _dbContext.SaveChanges();
        }

		public List<TEntity> BuscarTodos()
		{
			return _dbContext.Set<TEntity>().ToList();
		}

		public TEntity? ObterPorCodigo(Guid codigo)
		{
			return _dbContext.Set<TEntity>().Where(e => e.Codigo == codigo).SingleOrDefault();
		}
	}
}
