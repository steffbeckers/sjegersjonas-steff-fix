namespace Orion.Application.Dtos.Product
{
    public class ProductListDto
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public Guid ProductCategoryId { get; set; }
        public string ProductCategory { get; set; }
    }
}
