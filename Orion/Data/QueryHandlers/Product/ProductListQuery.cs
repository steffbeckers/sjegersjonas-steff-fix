using Dapper;
using Orion.Infrastructure.Connection;
using Orion.Infrastructure.Queries;
using Orion.Infrastructure.Queries.Pagination;
using System.Data;
using Orion.Helpers;
using Orion.Application.Dtos.Product;
using Orion.Controllers.Requests.Product;

namespace Orion.Data.QueryHandlers.Product
{
    public class ProductListQuery : PagedQueryBase<ProductListDto>
    {
        public ProductFilterParams FilterParams { get; set; }

        public ProductListQuery(ProductFilterParams filterParams, SortingParams sortingParams, PagingParams pagingParams) : base(sortingParams, pagingParams)
        {
            FilterParams = filterParams;
        }
    }

    public class ProductListQueryHandler : PagedQueryHandlerBase<ProductListQuery, ProductListDto>
    {
        public ProductListQueryHandler(IConnectionFactory connectionFactory) : base(connectionFactory) { }

        protected override async Task<PagedQueryResult<ProductListDto>> ExecuteQueries(ProductListQuery query, IDbConnection connection)
        {
            var test = (query.FilterParams.Id == null) ? null : query.FilterParams.Id.ToString().ToUpper();
            var whereClause = "";
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.Id, "Id");
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.Name, "Name");
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.Code, "Code");
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.ProductCategoryId, "ProductCategoryId");

            var sql = CreatePaginationQueries("SELECT Id AS ProductId, Name, Code, Description, ProductCategoryId", "Products", whereClause, query.SortingParams);
            
            var sqlParams = new DapperParameters(query.PagingParams)
            {
                { "Id", query.FilterParams.Id },
                { "Name", query.FilterParams.Name },
                { "Code", query.FilterParams.Code },
                { "ProductCategoryId", query.FilterParams.ProductCategoryId }
            };

            List<ProductListDto> dto;
            int totalItems;
            using (var multi = await connection.QueryMultipleAsync(sql, sqlParams))
            {
                dto = multi.Read<ProductListDto>().ToList();
                totalItems = multi.Read<int>().Single();
            }

            foreach(var item in dto)
            {
                await AddJoins(item, connection);
            }
            
            return new PagedQueryResult<ProductListDto>(dto, totalItems);
        }

        protected override SortingParams GetDefaultSorting() => new SortingParams { Sort = new[] { new SortingParam { PropertyName = "Name", Order = SortOrder.Asc } } };

        protected override string[] GetAllowedSortColumns() => new[] { "Name", "Code", "ProductCategoryId" };

        private static async Task AddJoins(ProductListDto dto, IDbConnection connection)
        {
            const string sql = @"SELECT Name FROM ProductCategories WHERE Id = @ProductCategoryId;";

            using (var multi = await connection.QueryMultipleAsync(sql, new
            {
                ProductCategoryId = dto.ProductCategoryId
            }))
            {
                dto.ProductCategory = multi.Read<string>().FirstOrDefault();
            }
        }
    }

}
