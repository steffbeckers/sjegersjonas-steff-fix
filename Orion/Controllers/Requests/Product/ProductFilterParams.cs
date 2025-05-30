using Orion.Infrastructure.Queries.Filtering;

namespace Orion.Controllers.Requests.Product
{
    public class ProductFilterParams
    {
        public FilterParam<Guid>[]? Id { get; set; }
        public FilterParam<string>? Name { get; set; }
        public FilterParam<string>? Code { get; set; }
        public FilterParam<Guid>? ProductCategoryId { get; set; }
    }
}
