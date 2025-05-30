using Orion.Application.Dtos.Product;
using Orion.Infrastructure.Queries.Pagination;
using Orion.Infrastructure.Responses;

namespace Orion.Controllers.Responses.Product
{
    public class ProductDetailsResponse
    {
        public ProductDetailsDto ProductDetails { get; set; }
        public PagedResponseEnvelope<ProductPriceListDto> ProductPrices { get; set; }

    }
}
