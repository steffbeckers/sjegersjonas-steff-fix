namespace Orion.Application.Dtos.ProductProductUnit
{
    public class ProductProductUnitDetailsDto
    {
        public Guid ProductProductUnitId { get; set; }
        public int Price { get; set; }
        public Guid ProductId { get; set; }
        public Guid ProductUnitId { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
