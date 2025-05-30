using MediatR;
using Orion.Data.Repositories.Interfaces;
using Orion.Infrastructure.Commands;

namespace Orion.Application.CommandHandlers.ProductCategory
{
    public class DeleteProductCategoryCommand : IRequest<CommandResult<Guid>>
    {
        public Guid Id { get; set; }

        public static DeleteProductCategoryCommand Create(Guid id) => new DeleteProductCategoryCommand
        {
            Id = id,
        };
    }

    public class DeleteProductCategoryCommandHandler : IRequestHandler<DeleteProductCategoryCommand, CommandResult<Guid>>
    {
        private readonly IProductCategoryRepository _productCategoryRepository;

        public DeleteProductCategoryCommandHandler(IProductCategoryRepository productCategoryRepository)
        {
            _productCategoryRepository = productCategoryRepository;
        }
        public async Task<CommandResult<Guid>> Handle(DeleteProductCategoryCommand command, CancellationToken cancellationToken)
        {
            var productCategory = await _productCategoryRepository.GetById(command.Id);
            if (productCategory == null)
            {
                return CommandResult.Fail<Guid>(1000);
            }

            await _productCategoryRepository.Delete(productCategory.Id);
            await _productCategoryRepository.SaveChangesAsync();

            return CommandResult.Ok(productCategory.Id);
        }
    }
}
