using Orion.Infrastructure.Domain.Entity;

namespace Orion.Domain.Entities
{
    public class ProductCategory : EntityBase
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public List<Product> Products { get; set; }

        public ProductCategory(string name, string description)
        {
            Name = name;
            Description = description;
        }
    }
}
