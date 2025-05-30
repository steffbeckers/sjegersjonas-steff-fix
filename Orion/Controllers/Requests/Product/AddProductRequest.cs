using FluentValidation;

namespace Orion.Controllers.Requests.Product
{
    public class AddProductRequest
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string? Description { get; set; }
        public Guid ProductCategoryId { get; set; }
    }

    public class AddProductRequestValidator : AbstractValidator<AddProductRequest>
    {
        public AddProductRequestValidator()
        {
            RuleFor(req => req.Name).NotEmpty().MaximumLength(50);
            RuleFor(req => req.Code).NotEmpty().MaximumLength(30);
            RuleFor(req => req.Description).MaximumLength(100);
            RuleFor(req => req.ProductCategoryId).NotEmpty();
        }
    }
}
