using Orion.Infrastructure.Queries.Filtering;

namespace Orion.Controllers.Requests.ProductUnit
{
    public class ProductUnitFilterParams
    {
        public FilterParam<int>[]? Id { get; set; }
        public FilterParam<string>? Name { get; set; }
    }
}
