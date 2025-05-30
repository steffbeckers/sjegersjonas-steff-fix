using Dapper;
using Orion.Infrastructure.Connection;
using Orion.Application.Dtos.ProductCategory;
using MediatR;
using Orion.Application.Dtos.Product;
using System.Data;
using Orion.Application.Dtos.ValueAddedTaxRate;
using Orion.Application.Dtos;

namespace Orion.Data.QueryHandlers.Product
{
    public class ProductDetailsQuery : IRequest<ProductDetailsDto>
    {
        public Guid Id { get; }
        public ProductDetailsQuery(Guid id)
        {
            Id = id;
        }
    }

    public class ProductDetailsQueryHandler : IRequestHandler<ProductDetailsQuery, ProductDetailsDto>
    {
        private readonly IConnectionFactory _connectionFactory;

        public ProductDetailsQueryHandler(IConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<ProductDetailsDto> Handle(ProductDetailsQuery query, CancellationToken cancellationToken)
        {
            using (var connection = await _connectionFactory.Create())
            {
                string sql = @"SELECT Id AS ProductId, Name, Code, Description, ProductCategoryId, CreatedOn FROM Products WHERE Id = @ProductId";
                var dto = new ProductDetailsDto();
                dto = await connection.QueryFirstOrDefaultAsync<ProductDetailsDto>(sql, new
                {
                    ProductId = query.Id
                });
                if(dto != null)
                {
                    await AddJoins(dto, connection);
                }
                
                return dto;
            }
        }

        private static async Task AddJoins(ProductDetailsDto dto, IDbConnection connection)
        {
            const string sql = @"SELECT Id AS ProductCategoryId, Name, Description FROM ProductCategories WHERE Id = @ProductCategoryId;";

            using (var multi = await connection.QueryMultipleAsync(sql, new
            {
                ProductCategoryId = dto.ProductCategoryId
            }))
            {
                dto.ProductCategory = multi.Read<ProductCategoryListDto>().FirstOrDefault();
            }
        }
    }

}
