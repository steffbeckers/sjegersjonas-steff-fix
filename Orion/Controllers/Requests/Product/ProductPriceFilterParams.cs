using Orion.Infrastructure.Queries.Filtering;

namespace Orion.Controllers.Requests.Product
{
    public class ProductPriceFilterParams
    {
        public FilterParam<Guid>[]? ProductProductUnitId { get; set; }
        public FilterParam<Guid>[]? ProductId { get; set; }
    }
}
