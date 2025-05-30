namespace Orion.Application.Dtos.Product
{
    public class ProductPriceListDto
    {
        public Guid ProductProductUnitId { get; set; }
        public int Price { get; set; }
        public Guid ProductId { get; set; }
        public Guid ProductUnitId { get; set; }
        public string ProductUnitName { get; set; }
        public string ProductUnitDescription { get; set; }
    }
}
