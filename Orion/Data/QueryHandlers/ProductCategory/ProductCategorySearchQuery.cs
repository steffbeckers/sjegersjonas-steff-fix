using Dapper;
using Orion.Infrastructure.Connection;
using Orion.Application.Dtos.ProductCategory;
using MediatR;
using System.Dynamic;

namespace Orion.Data.QueryHandlers.ProductCategory
{
    public class ProductCategorySearchQuery : IRequest<List<ProductCategoryListDto>>
    {
        public string? Name { get; set; }
        public int? Id { get; set; }
        public ProductCategorySearchQuery(string? name, int? id)
        {
            Name = name;
            Id = id;
        }
    }

    public class ProductCategorySearchQueryHandler : IRequestHandler<ProductCategorySearchQuery, List<ProductCategoryListDto>>
    {
        private readonly IConnectionFactory _connectionFactory;

        public ProductCategorySearchQueryHandler(IConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<List<ProductCategoryListDto>> Handle(ProductCategorySearchQuery query, CancellationToken cancellationToken)
        {
            var nameParam = "%" + query.Name + "%";
            var sqlParams = new DynamicParameters();
            sqlParams.Add("Name", nameParam);
            sqlParams.Add("Limit", 5);

            using (var connection = await _connectionFactory.Create())
            {
                string sql = @"SELECT Id AS ProductCategoryId, Name, Description FROM ProductCategories";
                if (!string.IsNullOrEmpty(query.Name))
                {
                    sql += " WHERE Name LIKE @Name";
                }
                sql += " LIMIT @Limit;";

                if(query.Id != null)
                {
                    sql += @"SELECT Id AS ProductCategoryId, Name, Description FROM ProductCategories WHERE Id = @Id;";
                    sqlParams.Add("Id", query.Id);
                }
                List<ProductCategoryListDto> dto;
                using (var multi = await connection.QueryMultipleAsync(sql, sqlParams))
                {
                    dto = multi.Read<ProductCategoryListDto>().ToList();
                    if(query.Id == null || dto.FirstOrDefault(x => x.ProductCategoryId.Equals(query.Id)) != null) { return dto; }
                    var productCategory = multi.Read<ProductCategoryListDto>().SingleOrDefault();
                    if(productCategory != null)
                    {
                        dto.Insert(0, productCategory);
                    }
                }
                return dto;
            }
        }
    }

}
