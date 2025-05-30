using Orion.Domain.Entities;
using Orion.Infrastructure.Repository;

namespace Orion.Data.Repositories.Interfaces
{
    public interface IProductRepository : IRepositoryBase<Product>
    {
        Task<List<Product>> GetByName(string name);
        Task<List<Product>> GetByCode(string code);
    }
}
