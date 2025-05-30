using Dapper;
using Orion.Infrastructure.Connection;
using Orion.Infrastructure.Queries;
using Orion.Infrastructure.Queries.Pagination;
using System.Data;
using Orion.Helpers;
using Orion.Application.Dtos.ProductCategory;
using Orion.Controllers.Requests.ProductCategory;

namespace Orion.Data.QueryHandlers.ProductCategory
{
    public class ProductCategoryListQuery : PagedQueryBase<ProductCategoryListDto>
    {
        public ProductCategoryFilterParams FilterParams { get; set; }

        public ProductCategoryListQuery(ProductCategoryFilterParams filterParams, SortingParams sortingParams, PagingParams pagingParams) : base(sortingParams, pagingParams)
        {
            FilterParams = filterParams;
        }
    }

    public class ProductCategoryListQueryHandler : PagedQueryHandlerBase<ProductCategoryListQuery, ProductCategoryListDto>
    {
        public ProductCategoryListQueryHandler(IConnectionFactory connectionFactory) : base(connectionFactory) { }

        protected override async Task<PagedQueryResult<ProductCategoryListDto>> ExecuteQueries(ProductCategoryListQuery query, IDbConnection connection)
        {
            var whereClause = "";
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.Id, "Id");
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.Name, "Name");

            var sql = CreatePaginationQueries("SELECT Id AS ProductCategoryId, Name, Description", "ProductCategories", whereClause, query.SortingParams);

            var sqlParams = new DapperParameters(query.PagingParams)
            {
                { "Id", query.FilterParams.Id },
                { "Name", query.FilterParams.Name },
            };

            List<ProductCategoryListDto> dto;
            int totalItems;
            using (var multi = await connection.QueryMultipleAsync(sql, sqlParams))
            {
                dto = multi.Read<ProductCategoryListDto>().ToList();
                totalItems = multi.Read<int>().Single();
            }

            return new PagedQueryResult<ProductCategoryListDto>(dto, totalItems);
        }

        protected override SortingParams GetDefaultSorting() => new SortingParams { Sort = new[] { new SortingParam { PropertyName = "Name", Order = SortOrder.Asc } } };

        protected override string[] GetAllowedSortColumns() => new[] { "Id", "Name" };
    }

}
