using Dapper;
using Orion.Infrastructure.Connection;
using Orion.Infrastructure.Queries;
using Orion.Infrastructure.Queries.Pagination;
using System.Data;
using Orion.Helpers;
using Orion.Application.Dtos.ProductUnit;
using Orion.Controllers.Requests.ProductUnit;
using MediatR;

namespace Orion.Data.QueryHandlers.ProductUnit
{
    public class ProductUnitDetailsQuery : IRequest<ProductUnitListDto>
    {
        public Guid Id { get; }
        public ProductUnitDetailsQuery(Guid id)
        {
            Id = id;
        }
    }

    public class ProductUnitDetailsQueryHandler : IRequestHandler<ProductUnitDetailsQuery, ProductUnitListDto>
    {
        private readonly IConnectionFactory _connectionFactory;

        public ProductUnitDetailsQueryHandler(IConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<ProductUnitListDto> Handle(ProductUnitDetailsQuery query, CancellationToken cancellationToken)
        {
            using (var connection = await _connectionFactory.Create())
            {
                string sql = @"SELECT Id AS ProductUnitId, Name, Description FROM ProductUnits WHERE Id = @ProductUnitId";

                return await connection.QueryFirstOrDefaultAsync<ProductUnitListDto>(sql, new
                {
                    ProductUnitId = query.Id
                });
            }
        }
    }

}
