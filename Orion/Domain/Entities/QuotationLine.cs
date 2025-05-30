using Orion.Infrastructure.Domain.Entity;

namespace Orion.Domain.Entities
{
    public class QuotationLine : EntityBase
    {
        public Quotation Quotation { get; set; }
        public Guid QuotationId { get; set; }
        public int SequenceNumber { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public Product Product { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public ProductUnit ProductUnit { get; set; }
        public Guid ProductUnitId { get; set; }
        public ValueAddedTaxRate ValueAddedTaxRate { get; set; }
        public Guid ValueAddedTaxRateId { get; set; }
    }
}
