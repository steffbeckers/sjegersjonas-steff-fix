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
    public class DeleteProductPriceCommand : IRequest<CommandResult<Guid>>
    {
        public Guid Id { get; set; }

        public DeleteProductPriceCommand(Guid id)
        {
            Id = id;
        }
    }

    public class DeleteProductPriceCommandHandler : IRequestHandler<DeleteProductPriceCommand, CommandResult<Guid>>
    {
        private readonly IProductProductUnitRepository _productProductUnitRepository;

        public DeleteProductPriceCommandHandler(IProductProductUnitRepository productProductUnitRepository)
        {
            _productProductUnitRepository = productProductUnitRepository;
        }
        public async Task<CommandResult<Guid>> Handle(DeleteProductPriceCommand command, CancellationToken cancellationToken)
        {
            var productPrice = await _productProductUnitRepository.GetById(command.Id);
            if (productPrice == null)
            {
                return CommandResult.Fail<Guid>(1000);
            }

            await _productProductUnitRepository.Delete(productPrice.Id);
            await _productProductUnitRepository.SaveChangesAsync();

            return CommandResult.Ok(command.Id);
        }
    }

}
