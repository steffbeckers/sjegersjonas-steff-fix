using MediatR;
using Orion.Application.Errors;
using Orion.Controllers.Requests.Product;
using Orion.Data.Repositories.Interfaces;
using Orion.Helpers;
using Orion.Infrastructure.Commands;

namespace Orion.Application.CommandHandlers.Product
{
    public class UpdateProductCommand : IRequest<CommandResult<Guid>>
    {
        public UpdateProductRequest Request { get; set; }

        public UpdateProductCommand(UpdateProductRequest request)
        {
            Request = request;
        }
    }

    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, CommandResult<Guid>>
    {
        private readonly IProductRepository _productRepository;
        private readonly IProductCategoryRepository _productCategoryRepository;

        public UpdateProductCommandHandler(IProductRepository productRepository, IProductCategoryRepository productCategoryRepository)
        {
            _productRepository = productRepository;
            _productCategoryRepository = productCategoryRepository;
        }
        public async Task<CommandResult<Guid>> Handle(UpdateProductCommand command, CancellationToken cancellationToken)
        {
            var name = command.Request.Name.Trim();
            var code = command.Request.Code.Trim();
            var description = StringHelper.TrimOrSetNull(command.Request.Description);

            var product = await _productRepository.GetById(command.Request.Id);
            if (product == null)
            {
                return CommandResult.Fail<Guid>(1000);
            }

            var productCategory = await _productCategoryRepository.GetById(command.Request.ProductCategoryId);
            if (productCategory == null)
            {
                return CommandResult.Fail<Guid>(1000);
            }

            var productList = await _productRepository.GetByName(name);
            foreach(var p in productList)
            {
                if(!p.Id.Equals(product.Id)) { return CommandResult.Fail<Guid>(1001); }
            }

            productList = await _productRepository.GetByCode(code);
            foreach (var p in productList)
            {
                if (!p.Id.Equals(product.Id)) { return CommandResult.Fail<Guid>(1500); }
            }

            product.Update(name, code, description, productCategory.Id);
            await _productRepository.SaveChangesAsync();

            return CommandResult.Ok(product.Id);
        }
    }

}
