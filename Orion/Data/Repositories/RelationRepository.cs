using Microsoft.EntityFrameworkCore;
using Orion.Data.Repositories.Interfaces;
using Orion.Domain.Entities;
using Orion.Infrastructure.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Orion.Data.Repositories
{
    public class RelationRepository : RepositoryBase<Relation>, IRelationRepository
    {
        public RelationRepository(ApplicationContext context) : base(context) { }

        public async Task<List<Relation>> GetByName(string name)
        {
            return await context.Set<Relation>().Where(x => x.Name.Equals(name) && x.IsDeleted.Equals(false)).ToListAsync();
        }

    }
}
