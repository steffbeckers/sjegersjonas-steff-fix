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
    public class ProductPriceListQuery : PagedQueryBase<ProductPriceListDto>
    {
        public ProductPriceFilterParams FilterParams { get; set; }

        public ProductPriceListQuery(ProductPriceFilterParams filterParams, SortingParams sortingParams, PagingParams pagingParams) : base(sortingParams, pagingParams)
        {
            FilterParams = filterParams;
        }
    }

    public class ProductPriceListQueryHandler : PagedQueryHandlerBase<ProductPriceListQuery, ProductPriceListDto>
    {
        public ProductPriceListQueryHandler(IConnectionFactory connectionFactory) : base(connectionFactory) { }

        protected override async Task<PagedQueryResult<ProductPriceListDto>> ExecuteQueries(ProductPriceListQuery query, IDbConnection connection)
        {
            var whereClause = "";
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.ProductProductUnitId, "ppu.Id");
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.ProductId, "ProductId");

            var select = "SELECT ppu.Id AS ProductProductUnitId, ppu.Price, ppu.ProductId, pu.Id AS ProductUnitId, pu.Name AS ProductUnitName, pu.Description AS ProductUnitDescription";
            var join = "ProductProductUnit AS ppu INNER JOIN ProductUnits AS pu ON ppu.ProductUnitId = pu.Id";

            var sql = CreatePaginationQueries(select, join, whereClause, query.SortingParams);

            var sqlParams = new DapperParameters(query.PagingParams)
            {
                { "ppu.Id", query.FilterParams.ProductProductUnitId },
                { "ProductId", query.FilterParams.ProductId }
            };

            List<ProductPriceListDto> dto;
            int totalItems;
            using (var multi = await connection.QueryMultipleAsync(sql, sqlParams))
            {
                dto = multi.Read<ProductPriceListDto>().ToList();
                totalItems = multi.Read<int>().Single();
            }

            return new PagedQueryResult<ProductPriceListDto>(dto, totalItems);
        }

        protected override SortingParams GetDefaultSorting() => new SortingParams { Sort = new[] { new SortingParam { PropertyName = "ProductUnitName", Order = SortOrder.Asc } } };

        protected override string[] GetAllowedSortColumns() => new[] { "ProductUnitName", "Price" };
    }

}
