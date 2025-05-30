using Orion.Infrastructure.Domain.Entity;

namespace Orion.Domain.Entities
{
    public class Product : SoftDeletableEntityBase
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string? Description { get; set; }
        public Guid ProductCategoryId { get; set; }
        public ProductCategory ProductCategory { get; set; }
        public List<ProductProductUnit> ProductProductUnits { get; set; }
        public List<QuotationLine> QuotationLines { get; set; }

        public Product(string name, string code, Guid productCategoryId, string? description = null)
        {
            Name = name;
            Code = code;
            Description = description;
            ProductCategoryId = productCategoryId;
        }

        public void Update(string name, string code, string? description, Guid productCategoryId)
        {
            Name = name;
            Code = code;
            Description = description;
            ProductCategoryId = productCategoryId;
        }
    }
}
