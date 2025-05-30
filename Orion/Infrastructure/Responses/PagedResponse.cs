using Orion.Infrastructure.Queries.Pagination;

namespace Orion.Infrastructure.Responses
{
    public class PagedResponse : PaginationData
    {
        public PagedResponse(PaginationData paginationData)
        {
            Page = paginationData.Page;
            PageSize = paginationData.PageSize;
            TotalItems = paginationData.TotalItems;
        }
    }
}
