using Microsoft.AspNetCore.Identity;
using Orion.Infrastructure.Domain.Entity;

namespace Orion.Domain.Entities
{
    public class Quotation : EntityBase
    {
        public string QuotationNumber { get; set; }
        public DateTime ValidTill { get; set; }
        public DateTime QuotationDate { get; set; }
        public Relation Relation { get; set; }
        public Guid RelationId { get; set; }
        public string Description { get; set; }
        public string Reference { get; set; }
        public QuotationStatus QuotationStatus { get; set; }
        public Guid QuotationStatusId { get; set; }
        public IdentityUser ContactPerson { get; set; }
        public string ContactPersonId { get; set; }
        public List<QuotationLine> QuotationLines { get; set; }
    }
}
