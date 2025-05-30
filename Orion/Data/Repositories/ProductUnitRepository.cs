using Microsoft.EntityFrameworkCore;
using Orion.Data.Repositories.Interfaces;
using Orion.Domain.Entities;
using Orion.Infrastructure.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Orion.Data.Repositories
{
    public class ProductUnitRepository : RepositoryBase<ProductUnit>, IProductUnitRepository
    {
        public ProductUnitRepository(ApplicationContext context) : base(context) { }
    }
}
