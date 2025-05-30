using Microsoft.EntityFrameworkCore;
using Orion.Data.Repositories.Interfaces;
using Orion.Domain.Entities;
using Orion.Infrastructure.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Orion.Data.Repositories
{
    public class ProductCategoryRepository : RepositoryBase<ProductCategory>, IProductCategoryRepository
    {
        public ProductCategoryRepository(ApplicationContext context) : base(context) { }
    }
}
