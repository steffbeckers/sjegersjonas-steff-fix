using Microsoft.EntityFrameworkCore;
using Orion.Data.Repositories.Interfaces;
using Orion.Domain.Entities;
using Orion.Infrastructure.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Orion.Data.Repositories
{
    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        public ProductRepository(ApplicationContext context) : base(context) { }

        public async Task<List<Product>> GetByName(string name)
        {
            return await context.Set<Product>().Where(x => x.Name.Equals(name) && x.IsDeleted.Equals(false)).ToListAsync();
        }

        public async Task<List<Product>> GetByCode(string code)
        {
            return await context.Set<Product>().Where(x => x.Code.Equals(code) && x.IsDeleted.Equals(false)).ToListAsync();
        }

    }
}
