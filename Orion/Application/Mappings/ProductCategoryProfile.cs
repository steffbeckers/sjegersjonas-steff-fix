using AutoMapper;
using Orion.Application.CommandHandlers.ProductCategory;
using Orion.Controllers.Requests.ProductCategory;

namespace Orion.Application.Mappings
{
    public class ProductCategoryProfile : Profile
    {
        public ProductCategoryProfile()
        {
            CreateMap<AddProductCategoryRequest, AddProductCategoryCommand>();
        }
    }
}
