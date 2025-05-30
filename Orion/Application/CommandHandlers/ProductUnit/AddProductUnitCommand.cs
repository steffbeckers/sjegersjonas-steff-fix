using MediatR;
using Orion.Data.Repositories.Interfaces;
using Orion.Infrastructure.Commands;

namespace Orion.Application.CommandHandlers.ProductUnit
{
    public class AddProductUnitCommand : IRequest<CommandResult<Guid>>
    {
        public string Name { get; set; }
        public string? Description { get; set; }

        public static AddProductUnitCommand Create(string name, string? description) => new AddProductUnitCommand
        {
            Name = name,
            Description = description
        };
    }

    public class AddProductUnitCommandHandler : IRequestHandler<AddProductUnitCommand, CommandResult<Guid>>
    {
        private readonly IProductUnitRepository _ProductUnitRepository;

        public AddProductUnitCommandHandler(IProductUnitRepository ProductUnitRepository)
        {
            _ProductUnitRepository = ProductUnitRepository;
        }
        public async Task<CommandResult<Guid>> Handle(AddProductUnitCommand command, CancellationToken cancellationToken)
        {

            var ProductUnit = new Domain.Entities.ProductUnit(command.Name, command.Description);

            await _ProductUnitRepository.AddAsync(ProductUnit);
            await _ProductUnitRepository.SaveChangesAsync();

            return CommandResult.Ok(ProductUnit.Id);
        }
    }

}
