using Orion.Infrastructure.Domain.Entity;

namespace Orion.Domain.Entities
{
    public class QuotationStatus : SoftDeletableEntityBase
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Quotation> Quotations { get; set; }
    }
}
