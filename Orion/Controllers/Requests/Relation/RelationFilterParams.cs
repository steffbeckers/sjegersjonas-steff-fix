using Orion.Infrastructure.Queries.Filtering;

namespace Orion.Controllers.Requests.Relation
{
    public class RelationFilterParams
    {
        public FilterParam<Guid>[]? Id { get; set; }
        public FilterParam<string>? Name { get; set; }
        public FilterParam<string>? VatNumber { get; set; }
        public FilterParam<string>? Street { get; set; }
        public FilterParam<string>? PostalCode { get; set; }
        public FilterParam<string>? City { get; set; }
        public FilterParam<string>? Country { get; set; }
        public FilterParam<string>? Language { get; set; }
        public FilterParam<string>? Email { get; set; }
        public FilterParam<bool>? IsCompany { get; set; }
    }
}
