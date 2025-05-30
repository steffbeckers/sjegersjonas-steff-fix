using Dapper;
using Orion.Infrastructure.Connection;
using Orion.Infrastructure.Queries;
using Orion.Infrastructure.Queries.Pagination;
using System.Data;
using Orion.Helpers;
using Orion.Application.Dtos.ValueAddedTaxRate;
using Orion.Controllers.Requests.ValueAddedTaxRate;
using MediatR;

namespace Orion.Data.QueryHandlers.ValueAddedTaxRate
{
    public class ValueAddedTaxRateDetailsQuery : IRequest<ValueAddedTaxRateListDto>
    {
        public Guid Id { get; }
        public ValueAddedTaxRateDetailsQuery(Guid id)
        {
            Id = id;
        }
    }

    public class ValueAddedTaxRateDetailsQueryHandler : IRequestHandler<ValueAddedTaxRateDetailsQuery, ValueAddedTaxRateListDto>
    {
        private readonly IConnectionFactory _connectionFactory;

        public ValueAddedTaxRateDetailsQueryHandler(IConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<ValueAddedTaxRateListDto> Handle(ValueAddedTaxRateDetailsQuery query, CancellationToken cancellationToken)
        {
            using (var connection = await _connectionFactory.Create())
            {
                string sql = @"SELECT Id AS ValueAddedTaxRateId, Percentage FROM ValueAddedTaxRates WHERE Id = @ValueAddedTaxRateId";

                return await connection.QueryFirstOrDefaultAsync<ValueAddedTaxRateListDto>(sql, new
                {
                    ValueAddedTaxRateId = query.Id
                });
            }
        }
    }

}
