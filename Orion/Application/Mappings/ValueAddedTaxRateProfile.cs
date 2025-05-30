using AutoMapper;
using Orion.Application.CommandHandlers.ValueAddedTaxRate;
using Orion.Controllers.Requests.ValueAddedTaxRate;

namespace Orion.Application.Mappings
{
    public class ValueAddedTaxRateProfile : Profile
    {
        public ValueAddedTaxRateProfile()
        {
            CreateMap<AddValueAddedTaxRateRequest, AddValueAddedTaxRateCommand>();
        }
    }
}
