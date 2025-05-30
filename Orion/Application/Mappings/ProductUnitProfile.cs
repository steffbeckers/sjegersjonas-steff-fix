using AutoMapper;
using Orion.Application.CommandHandlers.ProductUnit;
using Orion.Controllers.Requests.ProductUnit;

namespace Orion.Application.Mappings
{
    public class ProductUnitProfile : Profile
    {
        public ProductUnitProfile()
        {
            CreateMap<AddProductUnitRequest, AddProductUnitCommand>();
        }
    }
}
