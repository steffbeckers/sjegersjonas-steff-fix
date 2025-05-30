using Orion.Domain.Entities;
using Orion.Infrastructure.Repository;

namespace Orion.Data.Repositories.Interfaces
{
    public interface IRelationRepository : IRepositoryBase<Relation>
    {
        Task<List<Relation>> GetByName(string name);
    }
}
