using Orion.Infrastructure.Domain.Entity;

namespace Orion.Domain.Entities
{
    public class ValueAddedTaxRate : EntityBase
    {
        public int Percentage { get; set; }
        public List<Product> Products { get; set; }
        public List<QuotationLine> QuotationLines { get; set; }

        public ValueAddedTaxRate(int percentage)
        {
            Percentage = percentage;
        }
    }
}
