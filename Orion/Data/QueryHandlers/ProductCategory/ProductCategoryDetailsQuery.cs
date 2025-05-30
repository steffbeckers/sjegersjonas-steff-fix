using Dapper;
using Orion.Infrastructure.Connection;
using Orion.Infrastructure.Queries;
using Orion.Infrastructure.Queries.Pagination;
using System.Data;
using Orion.Helpers;
using Orion.Application.Dtos.ProductCategory;
using Orion.Controllers.Requests.ProductCategory;
using MediatR;

namespace Orion.Data.QueryHandlers.ProductCategory
{
    public class ProductCategoryDetailsQuery : IRequest<ProductCategoryListDto>
    {
        public Guid Id { get; }
        public ProductCategoryDetailsQuery(Guid id)
        {
            Id = id;
        }
    }

    public class ProductCategoryDetailsQueryHandler : IRequestHandler<ProductCategoryDetailsQuery, ProductCategoryListDto>
    {
        private readonly IConnectionFactory _connectionFactory;

        public ProductCategoryDetailsQueryHandler(IConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<ProductCategoryListDto> Handle(ProductCategoryDetailsQuery query, CancellationToken cancellationToken)
        {
            using (var connection = await _connectionFactory.Create())
            {
                string sql = @"SELECT Id AS ProductCategoryId, Name, Description FROM ProductCategories WHERE Id = @ProductCategoryId";

                return await connection.QueryFirstOrDefaultAsync<ProductCategoryListDto>(sql, new
                {
                    ProductCategoryId = query.Id
                });
            }
        }
    }

}
