using MediatR;
using Orion.Application.Errors;
using Orion.Controllers.Requests.Product;
using Orion.Data.Repositories.Interfaces;
using Orion.Helpers;
using Orion.Infrastructure.Commands;

namespace Orion.Application.CommandHandlers.Product
{
    public class AddProductCommand : IRequest<CommandResult<Guid>>
    {
        public AddProductRequest Request { get; set; }

        public AddProductCommand(AddProductRequest request)
        {
            Request = request;
        }
    }

    public class AddProductCommandHandler : IRequestHandler<AddProductCommand, CommandResult<Guid>>
    {
        private readonly IProductRepository _productRepository;
        private readonly IProductCategoryRepository _productCategoryRepository;

        public AddProductCommandHandler(IProductRepository productRepository, IProductCategoryRepository productCategoryRepository)
        {
            _productRepository = productRepository;
            _productCategoryRepository = productCategoryRepository;
        }
        public async Task<CommandResult<Guid>> Handle(AddProductCommand command, CancellationToken cancellationToken)
        {
            var name = command.Request.Name.Trim();
            var code = command.Request.Code.Trim();
            var description = StringHelper.TrimOrSetNull(command.Request.Description);

            var productCategory = await _productCategoryRepository.GetById(command.Request.ProductCategoryId);
            if (productCategory == null)
            {
                return CommandResult.Fail<Guid>(1000);
            }

            var productList = await _productRepository.GetByName(name);
            if (productList.Count > 0)
            {
                return CommandResult.Fail<Guid>(1001);
            }

            productList = await _productRepository.GetByCode(code);
            if (productList.Count > 0)
            {
                 return CommandResult.Fail<Guid>(1500);
            }

            var product = new Domain.Entities.Product(
                command.Request.Name,
                command.Request.Code,
                command.Request.ProductCategoryId,
                command.Request.Description);
            
            await _productRepository.AddAsync(product);
            await _productRepository.SaveChangesAsync();

            return CommandResult.Ok(product.Id);
        }
    }

}
