using Dapper;
using Orion.Infrastructure.Connection;
using MediatR;
using Orion.Application.Dtos.ProductUnit;

namespace Orion.Data.QueryHandlers.ProductUnit
{
    public class ProductUnitSearchQuery : IRequest<List<ProductUnitListDto>>
    {
        public string? Name { get; set; }
        public int? Id { get; set; }
        public ProductUnitSearchQuery(string? name, int? id)
        {
            Name = name;
        }
    }

    public class ProductUnitSearchQueryHandler : IRequestHandler<ProductUnitSearchQuery, List<ProductUnitListDto>>
    {
        private readonly IConnectionFactory _connectionFactory;

        public ProductUnitSearchQueryHandler(IConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<List<ProductUnitListDto>> Handle(ProductUnitSearchQuery query, CancellationToken cancellationToken)
        {
            var nameParam = "%" + query.Name + "%";
            var sqlParams = new DynamicParameters();
            sqlParams.Add("Name", nameParam);
            sqlParams.Add("Limit", 5);

            using (var connection = await _connectionFactory.Create())
            {
                string sql = @"SELECT Id AS ProductUnitId, Name, Description FROM ProductUnits";
                if (!string.IsNullOrEmpty(query.Name))
                {
                    sql += " WHERE Name LIKE @Name";
                }
                sql += " LIMIT @Limit;";

                if (query.Id != null)
                {
                    sql += @"SELECT Id AS ProductUnitId, Name, Description FROM ProductUnits WHERE Id = @Id;";
                    sqlParams.Add("Id", query.Id);
                }

                List<ProductUnitListDto> dto;
                using (var multi = await connection.QueryMultipleAsync(sql, sqlParams))
                {
                    dto = multi.Read<ProductUnitListDto>().ToList();
                    if (query.Id == null || dto.FirstOrDefault(x => x.ProductUnitId.Equals(query.Id)) != null) { return dto; }
                    var productUnit = multi.Read<ProductUnitListDto>().SingleOrDefault();
                    if (productUnit != null)
                    {
                        dto.Insert(0, productUnit);
                    }
                }

                return dto;
            }
        }
    }

}
