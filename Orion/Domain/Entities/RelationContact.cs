using Orion.Infrastructure.Domain.Entity;

namespace Orion.Domain.Entities
{
    public class RelationContact : SoftDeletableEntityBase
    {
        public string Name { get; set; }
        public string? JobFunction { get; set; }
        public string? Street { get; set; } // Auto fill(editable) from Relation
        public string? PostalCode { get; set; } // Auto fill(editable) from Relation
        public string? City { get; set; } // Auto fill(editable) from Relation
        public string? Country { get; set; } // Auto fill(editable) from Relation
        public string? Language { get; set; } // Auto fill(editable) from Relation
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? MobilePhone { get; set; }
        public Guid RelationId { get; set; }
        public Relation Relation { get; set; }
    }
}
