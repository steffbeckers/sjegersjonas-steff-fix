using MediatR;
using Orion.Data.Repositories.Interfaces;
using Orion.Infrastructure.Commands;

namespace Orion.Application.CommandHandlers.ProductCategory
{
    public class AddProductCategoryCommand : IRequest<CommandResult<Guid>>
    {
        public string Name { get; set; }
        public string? Description { get; set; }

        public static AddProductCategoryCommand Create(string name, string? description) => new AddProductCategoryCommand
        {
            Name = name,
            Description = description
        };
    }

    public class AddProductCategoryCommandHandler : IRequestHandler<AddProductCategoryCommand, CommandResult<Guid>>
    {
        private readonly IProductCategoryRepository _productCategoryRepository;

        public AddProductCategoryCommandHandler(IProductCategoryRepository productCategoryRepository)
        {
            _productCategoryRepository = productCategoryRepository;
        }
        public async Task<CommandResult<Guid>> Handle(AddProductCategoryCommand command, CancellationToken cancellationToken)
        {

            var productCategory = new Domain.Entities.ProductCategory(command.Name, command.Description);

            await _productCategoryRepository.AddAsync(productCategory);
            await _productCategoryRepository.SaveChangesAsync();

            return CommandResult.Ok(productCategory.Id);
        }
    }

}
