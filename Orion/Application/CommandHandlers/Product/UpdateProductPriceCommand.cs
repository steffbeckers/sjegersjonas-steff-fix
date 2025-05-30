using MediatR;
using Orion.Controllers.Requests.Product;
using Orion.Data.Repositories.Interfaces;
using Orion.Infrastructure.Commands;

namespace Orion.Application.CommandHandlers.Product
{
    public class UpdateProductPriceCommand : IRequest<CommandResult<Guid>>
    {
        public UpdateProductPriceRequest Request { get; set; }

        public UpdateProductPriceCommand(UpdateProductPriceRequest request)
        {
            Request = request;
        }
    }

    public class UpdateProductPriceCommandHandler : IRequestHandler<UpdateProductPriceCommand, CommandResult<Guid>>
    {
        private readonly IProductProductUnitRepository _productProductUnitRepository;

        public UpdateProductPriceCommandHandler(IProductProductUnitRepository productProductUnitRepository)
        {
            _productProductUnitRepository = productProductUnitRepository;
        }
        public async Task<CommandResult<Guid>> Handle(UpdateProductPriceCommand command, CancellationToken cancellationToken)
        {

            var productProductUnit = await _productProductUnitRepository.GetById(command.Request.ProductProductUnitId);
            if (productProductUnit == null)
            {
                return CommandResult.Fail<Guid>(1000);
            }

            productProductUnit.Update(command.Request.Price);
            await _productProductUnitRepository.SaveChangesAsync();

            return CommandResult.Ok(productProductUnit.Id);
        }
    }

}
