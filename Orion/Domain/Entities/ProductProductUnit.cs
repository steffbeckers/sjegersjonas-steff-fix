using Orion.Infrastructure.Domain.Entity;

namespace Orion.Domain.Entities
{
    public class ProductProductUnit : EntityBase
    {
        public Guid ProductId { get; set; }
        public Product Product { get; set; }

        public Guid ProductUnitId { get; set; }
        public ProductUnit ProductUnit { get; set; }
        public int Price { get; set; }

        public ProductProductUnit(Guid productId, Guid productUnitId, int price)
        {
            ProductId = productId;
            ProductUnitId = productUnitId;
            Price = price;
        }

        public void Update(int price)
        {
            Price = price;
        }
    }
}
