using MediatR;

namespace Orion.Infrastructure.Queries.Pagination
{
    public class PagedQueryBase<T> : IRequest<PagedResult<T>>
        where T : class
    {
        public SortingParams SortingParams { get; private set; }
        public PagingParams PagingParams { get; private set; }

        protected PagedQueryBase(SortingParams sortingParams, PagingParams pagingParams)
        {
            SortingParams = sortingParams;
            PagingParams = pagingParams;
        }
    }
}
