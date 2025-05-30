using Dapper;
using Orion.Infrastructure.Connection;
using Orion.Infrastructure.Queries;
using Orion.Infrastructure.Queries.Pagination;
using System.Data;
using Orion.Helpers;
using Orion.Application.Dtos.Quotation;
using Orion.Controllers.Requests.Quotation;

namespace Orion.Data.QueryHandlers.Quotation
{
    public class QuotationListQuery : PagedQueryBase<QuotationListDto>
    {
        public QuotationFilterParams FilterParams { get; set; }

        public QuotationListQuery(QuotationFilterParams filterParams, SortingParams sortingParams, PagingParams pagingParams) : base(sortingParams, pagingParams)
        {
            FilterParams = filterParams;
        }
    }

    public class QuotationListQueryHandler : PagedQueryHandlerBase<QuotationListQuery, QuotationListDto>
    {
        public QuotationListQueryHandler(IConnectionFactory connectionFactory) : base(connectionFactory) { }

        protected override async Task<PagedQueryResult<QuotationListDto>> ExecuteQueries(QuotationListQuery query, IDbConnection connection)
        {
            var whereClause = "";
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.Id, "Id");
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.QuotationNumber, "QuotationNumber");
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.ValidTill, "ValidTill");

            var sql = CreatePaginationQueries("SELECT Id AS QuotationId, QuotationNumber, ValidTill, QuotationDate, QuotationStatusId", "Quotations", whereClause, query.SortingParams);

            var sqlParams = new DapperParameters(query.PagingParams)
            {
                { "Id", query.FilterParams.Id },
                { "QuotationNumber", query.FilterParams.QuotationNumber },
                { "ValidTill", query.FilterParams.ValidTill },
            };

            List<QuotationListDto> dto;
            int totalItems;
            using (var multi = await connection.QueryMultipleAsync(sql, sqlParams))
            {
                dto = multi.Read<QuotationListDto>().ToList();
                totalItems = multi.Read<int>().Single();
            }

            foreach (var item in dto)
            {
                await AddJoins(item, connection);
            }

            return new PagedQueryResult<QuotationListDto>(dto, totalItems);
        }

        protected override SortingParams GetDefaultSorting() => new SortingParams { Sort = new[] { new SortingParam { PropertyName = "QuotationDate", Order = SortOrder.Desc } } };

        protected override string[] GetAllowedSortColumns() => new[] { "QuotationNumber", "QuotationDate", "QuotationStatusId" };

        private static async Task AddJoins(QuotationListDto dto, IDbConnection connection)
        {
            const string sql = @"SELECT Name FROM QuotationStatus WHERE Id = @QuotationStatusId;";

            using (var multi = await connection.QueryMultipleAsync(sql, new
            {
                QuotationStatusId = dto.QuotationStatusId
            }))
            {
                dto.QuotationStatus = multi.Read<string>().FirstOrDefault();
            }
        }
    }

}
