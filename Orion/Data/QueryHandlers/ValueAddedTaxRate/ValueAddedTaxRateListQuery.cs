using Dapper;
using Orion.Infrastructure.Connection;
using Orion.Infrastructure.Queries;
using Orion.Infrastructure.Queries.Pagination;
using System.Data;
using Orion.Helpers;
using Orion.Application.Dtos.ValueAddedTaxRate;
using Orion.Controllers.Requests.ValueAddedTaxRate;

namespace Orion.Data.QueryHandlers.ValueAddedTaxRate
{
    public class ValueAddedTaxRateListQuery : PagedQueryBase<ValueAddedTaxRateListDto>
    {
        public ValueAddedTaxRateFilterParams FilterParams { get; set; }

        public ValueAddedTaxRateListQuery(ValueAddedTaxRateFilterParams filterParams, SortingParams sortingParams, PagingParams pagingParams) : base(sortingParams, pagingParams)
        {
            FilterParams = filterParams;
        }
    }

    public class ValueAddedTaxRateListQueryHandler : PagedQueryHandlerBase<ValueAddedTaxRateListQuery, ValueAddedTaxRateListDto>
    {
        public ValueAddedTaxRateListQueryHandler(IConnectionFactory connectionFactory) : base(connectionFactory) { }

        protected override async Task<PagedQueryResult<ValueAddedTaxRateListDto>> ExecuteQueries(ValueAddedTaxRateListQuery query, IDbConnection connection)
        {
            var whereClause = "";
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.Id, "Id");

            var sql = CreatePaginationQueries("SELECT Id AS ValueAddedTaxRateId, Percentage", "ValueAddedTaxRates", whereClause, query.SortingParams);

            var sqlParams = new DapperParameters(query.PagingParams)
            {
                { "Id", query.FilterParams.Id },
            };

            List<ValueAddedTaxRateListDto> dto;
            int totalItems;
            using (var multi = await connection.QueryMultipleAsync(sql, sqlParams))
            {
                dto = multi.Read<ValueAddedTaxRateListDto>().ToList();
                totalItems = multi.Read<int>().Single();
            }

            return new PagedQueryResult<ValueAddedTaxRateListDto>(dto, totalItems);
        }

        protected override SortingParams GetDefaultSorting() => new SortingParams { Sort = new[] { new SortingParam { PropertyName = "Percentage", Order = SortOrder.Asc } } };

        protected override string[] GetAllowedSortColumns() => new[] { "Id", "Percentage" };
    }

}
