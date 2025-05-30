using Microsoft.EntityFrameworkCore;
using Orion.Data;
using Orion.Infrastructure.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Orion.Infrastructure.Repository
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : EntityBase
    {
        protected readonly ApplicationContext context;
        private DbSet<T> entities;

        public RepositoryBase(ApplicationContext context)
        {
            this.context = context;
            entities = context.Set<T>();
        }
        public async Task<IEnumerable<T>> GetAll()
        {
            return await entities.ToListAsync();
        }
        public async Task<T> GetById(Guid id)
        {
            return await entities.FirstOrDefaultAsync(s => s.Id == id);
        }
        public async Task<List<T>> GetByIds(Guid[] ids)
        {
            return await entities.Where(x => ids.Contains(x.Id)).ToListAsync();
        }
        public async Task AddAsync(T entity)
        {
            if (entity == null) throw new ArgumentNullException("entity");

            entities.Add(entity);
        }
        public async Task Update(T entity)
        {
            if (entity == null) throw new ArgumentNullException("entity");
        }
        public async Task Delete(Guid id)
        {
            T entity = await entities.FirstOrDefaultAsync(s => s.Id == id);
            entities.Remove(entity);
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
