using System;

namespace Orion.Infrastructure.Domain.Entity
{
    public class EntityBase
    {
        public Guid Id { get; protected set; }
        public DateTime CreatedOn { get; protected set; }
        
        protected EntityBase()
        {
            Id = Guid.NewGuid();
            CreatedOn = DateTime.UtcNow;
        }
    }
}
