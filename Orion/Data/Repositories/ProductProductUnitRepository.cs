using Microsoft.EntityFrameworkCore;
using Orion.Data.Repositories.Interfaces;
using Orion.Domain.Entities;
using Orion.Infrastructure.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Orion.Data.Repositories
{
    public class ProductProductUnitRepository : RepositoryBase<ProductProductUnit>, IProductProductUnitRepository
    {
        public ProductProductUnitRepository(ApplicationContext context) : base(context) { }

        public async Task<ProductProductUnit> GetByPorductAndUnitId(Guid productId, Guid productUnitId)
        {
            return await context.Set<ProductProductUnit>().Where(x => x.ProductId.Equals(productId) && x.ProductUnitId.Equals(productUnitId)).FirstOrDefaultAsync();
        }
    }
}
