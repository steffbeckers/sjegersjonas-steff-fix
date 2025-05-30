using MediatR;
using Orion.Data.Repositories.Interfaces;
using Orion.Infrastructure.Commands;

namespace Orion.Application.CommandHandlers.ProductUnit
{
    public class DeleteProductUnitCommand : IRequest<CommandResult<Guid>>
    {
        public Guid Id { get; set; }

        public static DeleteProductUnitCommand Create(Guid id) => new DeleteProductUnitCommand
        {
            Id = id,
        };
    }

    public class DeleteProductUnitCommandHandler : IRequestHandler<DeleteProductUnitCommand, CommandResult<Guid>>
    {
        private readonly IProductUnitRepository _productUnitRepository;

        public DeleteProductUnitCommandHandler(IProductUnitRepository productUnitRepository)
        {
            _productUnitRepository = productUnitRepository;
        }
        public async Task<CommandResult<Guid>> Handle(DeleteProductUnitCommand command, CancellationToken cancellationToken)
        {
            var productUnit = await _productUnitRepository.GetById(command.Id);
            if (productUnit == null)
            {
                return CommandResult.Fail<Guid>(1000);
            }

            await _productUnitRepository.Delete(productUnit.Id);
            await _productUnitRepository.SaveChangesAsync();

            return CommandResult.Ok(productUnit.Id);
        }
    }
}
