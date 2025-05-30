using Orion.Application.Dtos.ProductCategory;

namespace Orion.Application.Dtos.Product
{
    public class ProductDetailsDto
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string? Description { get; set; }
        public Guid ProductCategoryId { get; set; }
        public ProductCategoryListDto ProductCategory { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
