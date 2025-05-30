using System;

namespace Orion.Infrastructure.Queries.Pagination
{
    public class PaginationData
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages => Math.Max(1, (int)Math.Ceiling(TotalItems / (double)PageSize));
    }
}
