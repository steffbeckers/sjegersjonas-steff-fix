using Orion.Domain.Entities;
using Orion.Infrastructure.Repository;

namespace Orion.Data.Repositories.Interfaces
{
    public interface IProductProductUnitRepository : IRepositoryBase<ProductProductUnit>
    {
        Task<ProductProductUnit> GetByPorductAndUnitId(Guid productId, Guid productUnitId);
    }
}