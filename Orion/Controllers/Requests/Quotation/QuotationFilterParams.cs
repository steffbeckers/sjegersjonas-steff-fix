using Orion.Infrastructure.Queries.Filtering;

namespace Orion.Controllers.Requests.Quotation
{
    public class QuotationFilterParams
    {
        public FilterParam<int>[]? Id { get; set; }
        public FilterParam<string>? QuotationNumber { get; set; }
        public FilterParam<DateTime>? ValidTill { get; set; }
    }
}
