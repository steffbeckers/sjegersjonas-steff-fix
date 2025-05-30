using MediatR;
using Orion.Infrastructure.Connection;
using System;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Orion.Helpers;

namespace Orion.Infrastructure.Queries.Pagination
{
    public abstract class PagedQueryHandlerBase<TQuery, TResult> : IRequestHandler<TQuery, PagedResult<TResult>>
        where TQuery : PagedQueryBase<TResult>
        where TResult : class
    {
        private readonly IConnectionFactory _connectionFactory;

        protected PagedQueryHandlerBase(IConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<PagedResult<TResult>> Handle(TQuery query, CancellationToken cancellationToken)
        {
            PagedQueryResult<TResult> data;
            using (var connection = await _connectionFactory.Create())
            {
                data = await ExecuteQueries(query, connection);
            }

            return new PagedResult<TResult>
            {
                Data = data.Data.ToArray(),
                Page = query.PagingParams.Page,
                PageSize = query.PagingParams.PageSize,
                TotalItems = data.TotalItems
            };
        }

        protected string CreatePaginationQueries(string select, string from, string whereClause, SortingParams sortingParams, string groupClause = "")
        {
            const string limitClause = " LIMIT @Limit Offset @Offset";
            // const string limitClause = " OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY";
            var orderClause = "";
            var sortingIsSet = !sortingParams?.Sort.IsNullOrEmpty() ?? false;
            if (sortingIsSet && sortingParams.Sort.Select(x => x.PropertyName).Any(x => !GetAllowedSortColumns().Contains(x, StringComparer.InvariantCultureIgnoreCase)))
            {
                throw new Exception("Order clause not valid");
            }

            if (sortingIsSet || GetDefaultSorting() != null)
            {
                var orderBy = string.Join(", ",
                    (sortingIsSet ? sortingParams : GetDefaultSorting()).Sort
                    .Select(x => $"{x.PropertyName} {x.Order}"));
                orderClause = $" ORDER BY {orderBy}";
            }

            if (string.IsNullOrEmpty(groupClause))
            {
                return $@"{select} FROM {from} {whereClause}{orderClause}{limitClause};
                       SELECT COUNT(1) FROM {from} {whereClause};";
            }

            return $@"{select} FROM {from} {whereClause}{groupClause}{orderClause}{limitClause};
                       SELECT DISTINCT COUNT(*) OVER () AS TotalRecords FROM {from} {whereClause}{groupClause};";

        }

        protected abstract Task<PagedQueryResult<TResult>> ExecuteQueries(TQuery query, IDbConnection connection);
        protected abstract SortingParams GetDefaultSorting();
        protected abstract string[] GetAllowedSortColumns();
    }
}
