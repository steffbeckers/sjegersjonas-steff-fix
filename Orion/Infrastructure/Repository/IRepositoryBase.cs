using Orion.Infrastructure.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Orion.Infrastructure.Repository
{
    public interface IRepositoryBase<T> where T : EntityBase
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(Guid id);
        Task<List<T>> GetByIds(Guid[] ids);
        Task AddAsync(T entity);
        Task Update(T entity);
        Task Delete(Guid id);
        Task SaveChangesAsync();
    }
}
