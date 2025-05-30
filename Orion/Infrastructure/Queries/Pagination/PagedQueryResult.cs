using System.Collections.Generic;

namespace Orion.Infrastructure.Queries.Pagination
{
    public class PagedQueryResult<TResult> where TResult : class
    {
        public IEnumerable<TResult> Data { get; set; }
        public int TotalItems { get; set; }

        public PagedQueryResult(IEnumerable<TResult> data, int totalItems)
        {
            Data = data;
            TotalItems = totalItems;
        }
    }
}
