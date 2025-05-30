using MediatR;
using Microsoft.EntityFrameworkCore;
using Orion.Application.Errors;
using Orion.Controllers.Requests.Product;
using Orion.Data;
using Orion.Data.Repositories.Interfaces;
using Orion.Domain.Entities;
using Orion.Helpers;
using Orion.Infrastructure.Commands;

namespace Orion.Application.CommandHandlers.Product
{
    public class AddProductPriceCommand : IRequest<CommandResult<Guid>>
    {
        public AddProductPriceRequest Request { get; set; }

        public AddProductPriceCommand(AddProductPriceRequest request)
        {
            Request = request;
        }
    }

    public class AddProductPriceCommandHandler : IRequestHandler<AddProductPriceCommand, CommandResult<Guid>>
    {
        private readonly IProductRepository _productRepository;
        private readonly IProductUnitRepository _productUnitRepository;
        private readonly IProductProductUnitRepository _productProductUnitRepository;

        public AddProductPriceCommandHandler(IProductRepository productRepository,
            IProductUnitRepository productUnitRepository,
            IProductProductUnitRepository productProductUnitRepository)
        {
            _productRepository = productRepository;
            _productUnitRepository = productUnitRepository;
            _productProductUnitRepository = productProductUnitRepository;
        }
        public async Task<CommandResult<Guid>> Handle(AddProductPriceCommand command, CancellationToken cancellationToken)
        {
            var product = await _productRepository.GetById(command.Request.ProductId);
            if (product == null)
            {
                return CommandResult.Fail<Guid>(1000);
            }

            var productUnit = await _productUnitRepository.GetById(command.Request.ProductUnitId);
            if (productUnit == null)
            {
                return CommandResult.Fail<Guid>(1000);
            }

            var productPrice = await _productProductUnitRepository.GetByPorductAndUnitId(product.Id, productUnit.Id);
            if (productPrice != null)
            {
                return CommandResult.Fail<Guid>(1002);
            }

            var newProductPrice = new ProductProductUnit(command.Request.ProductId, command.Request.ProductUnitId, command.Request.Price);
            await _productProductUnitRepository.AddAsync(newProductPrice);
            await _productProductUnitRepository.SaveChangesAsync();

            return CommandResult.Ok(newProductPrice.Id);
        }
    }

}
