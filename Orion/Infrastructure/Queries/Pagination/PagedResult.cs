namespace Orion.Infrastructure.Queries.Pagination
{
    public class PagedResult<T> : PaginationData where T : class
    {
        public T[] Data { get; set; }
    }
}
