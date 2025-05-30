using Dapper;
using Orion.Infrastructure.Connection;
using Orion.Infrastructure.Queries;
using Orion.Infrastructure.Queries.Pagination;
using System.Data;
using Orion.Helpers;
using Orion.Application.Dtos.ProductUnit;
using Orion.Controllers.Requests.ProductUnit;

namespace Orion.Data.QueryHandlers.ProductUnit
{
    public class ProductUnitListQuery : PagedQueryBase<ProductUnitListDto>
    {
        public ProductUnitFilterParams FilterParams { get; set; }

        public ProductUnitListQuery(ProductUnitFilterParams filterParams, SortingParams sortingParams, PagingParams pagingParams) : base(sortingParams, pagingParams)
        {
            FilterParams = filterParams;
        }
    }

    public class ProductUnitListQueryHandler : PagedQueryHandlerBase<ProductUnitListQuery, ProductUnitListDto>
    {
        public ProductUnitListQueryHandler(IConnectionFactory connectionFactory) : base(connectionFactory) { }

        protected override async Task<PagedQueryResult<ProductUnitListDto>> ExecuteQueries(ProductUnitListQuery query, IDbConnection connection)
        {
            var whereClause = "";
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.Id, "Id");
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.Name, "Name");

            var sql = CreatePaginationQueries("SELECT Id AS ProductUnitId, Name, Description", "ProductUnits", whereClause, query.SortingParams);

            var sqlParams = new DapperParameters(query.PagingParams)
            {
                { "Id", query.FilterParams.Id },
                { "Name", query.FilterParams.Name },
            };

            List<ProductUnitListDto> dto;
            int totalItems;
            using (var multi = await connection.QueryMultipleAsync(sql, sqlParams))
            {
                dto = multi.Read<ProductUnitListDto>().ToList();
                totalItems = multi.Read<int>().Single();
            }

            return new PagedQueryResult<ProductUnitListDto>(dto, totalItems);
        }

        protected override SortingParams GetDefaultSorting() => new SortingParams { Sort = new[] { new SortingParam { PropertyName = "Name", Order = SortOrder.Asc } } };

        protected override string[] GetAllowedSortColumns() => new[] { "Id", "Name" };
    }

}
