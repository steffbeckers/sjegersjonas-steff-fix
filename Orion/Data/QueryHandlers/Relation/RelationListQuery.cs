using Dapper;
using Orion.Infrastructure.Connection;
using Orion.Infrastructure.Queries;
using Orion.Infrastructure.Queries.Pagination;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Orion.Helpers;
using Orion.Application.Dtos.Relation;
using Orion.Controllers.Requests.Relation;

namespace Orion.Data.QueryHandlers.Relation
{
    public class RelationListQuery : PagedQueryBase<RelationListDto>
    {
        public RelationFilterParams FilterParams { get; set; }

        public RelationListQuery(RelationFilterParams filterParams, SortingParams sortingParams, PagingParams pagingParams) : base(sortingParams, pagingParams)
        {
            FilterParams = filterParams;
        }
    }

    public class RelationListQueryHandler : PagedQueryHandlerBase<RelationListQuery, RelationListDto>
    {
        public RelationListQueryHandler(IConnectionFactory connectionFactory) : base(connectionFactory) { }

        protected override async Task<PagedQueryResult<RelationListDto>> ExecuteQueries(RelationListQuery query, IDbConnection connection)
        {
            var whereClause = "";
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.Id, "Id");
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.Name, "Name");
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.VatNumber, "VatNumber");
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.Street, "Street");
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.PostalCode, "PostalCode");
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.City, "City");
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.Country, "Country");
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.Language, "Language");
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.Email, "Email");
            whereClause = whereClause.CreateOrAddWhere(query.FilterParams.IsCompany, "IsCompany");

            var sql = CreatePaginationQueries(@"SELECT Id AS RelationId, Name, Code, 
                     VatNumber, Website, Street, PostalCode, City, Country, Language, Email, Phone, MobilePhone, IsCompany", "Relations", whereClause, query.SortingParams);

            var sqlParams = new DapperParameters(query.PagingParams)
            {
                { "Id", query.FilterParams.Id },
                { "Name", query.FilterParams.Name },
                { "VatNumber", query.FilterParams.VatNumber },
                { "Street", query.FilterParams.Street },
                { "PostalCode", query.FilterParams.PostalCode },
                { "City", query.FilterParams.City },
                { "Country", query.FilterParams.Country },
                { "Language", query.FilterParams.Language },
                { "Email", query.FilterParams.Email },
                { "IsCompany", query.FilterParams.IsCompany }
            };

            List<RelationListDto> data;
            int totalItems;
            using (var multi = await connection.QueryMultipleAsync(sql, sqlParams))
            {
                data = multi.Read<RelationListDto>().ToList();
                totalItems = multi.Read<int>().Single();
            }

            return new PagedQueryResult<RelationListDto>(data, totalItems);
        }

        protected override SortingParams GetDefaultSorting() => new SortingParams { Sort = new[] { new SortingParam { PropertyName = "Name", Order = SortOrder.Asc } } };

        protected override string[] GetAllowedSortColumns() => new[] { "Name", "VatNumber", "Street", "PostalCode", "City", "Country", "Language", "Email", "IsCompany" };
    }
}
