using Dapper;
using Orion.Infrastructure.Connection;
using MediatR;
using Orion.Application.Dtos.Relation;
using System.Data;
using Orion.Application.Dtos.ValueAddedTaxRate;
using Orion.Application.Dtos;

namespace Orion.Data.QueryHandlers.Relation
{
    public class RelationDetailsQuery : IRequest<RelationDetailsDto>
    {
        public Guid Id { get; }
        public RelationDetailsQuery(Guid id)
        {
            Id = id;
        }
    }

    public class RelationDetailsQueryHandler : IRequestHandler<RelationDetailsQuery, RelationDetailsDto>
    {
        private readonly IConnectionFactory _connectionFactory;

        public RelationDetailsQueryHandler(IConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<RelationDetailsDto> Handle(RelationDetailsQuery query, CancellationToken cancellationToken)
        {
            using (var connection = await _connectionFactory.Create())
            {
                string sql = @"SELECT Id AS RelationId, Name, Code, 
                     VatNumber, Website, Street, PostalCode, City, Country, Language, Email, Phone, MobilePhone, IsCompany, CreatedOn FROM Relations WHERE Id = @RelationId";
                var dto = new RelationDetailsDto();
                dto = await connection.QueryFirstOrDefaultAsync<RelationDetailsDto>(sql, new
                {
                    RelationId = query.Id
                });

                return dto;
            }
        }
    }

}
