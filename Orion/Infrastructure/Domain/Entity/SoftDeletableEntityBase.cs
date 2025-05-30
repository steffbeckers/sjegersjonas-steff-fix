using System;

namespace Orion.Infrastructure.Domain.Entity
{
    public class SoftDeletableEntityBase : EntityBase
    {
        public bool IsDeleted { get; protected set; }
        public DateTime? DeletedOn { get; protected set; }

        protected SoftDeletableEntityBase() : base()
        {
            IsDeleted = false;
        }

        public void MarkAsDeleted()
        {
            IsDeleted = true;
            DeletedOn = DateTime.UtcNow;
        }
    }
}
