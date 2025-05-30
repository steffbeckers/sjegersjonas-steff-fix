using Orion.Infrastructure.Queries.Filtering;

namespace Orion.Controllers.Requests.ProductCategory
{
    public class ProductCategoryFilterParams
    {
        public FilterParam<int>[]? Id { get; set; }
        public FilterParam<string>? Name { get; set; }
    }
}
