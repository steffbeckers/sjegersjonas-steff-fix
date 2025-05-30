using Orion.Infrastructure.Domain.Entity;

namespace Orion.Domain.Entities
{
    public class ProductUnit : EntityBase
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public List<ProductProductUnit> ProductProductUnits { get; set; }
        public List<QuotationLine> QuotationLines { get; set; }

        public ProductUnit(string name, string description)
        {
            Name = name;
            Description = description;
        }
    }
}
