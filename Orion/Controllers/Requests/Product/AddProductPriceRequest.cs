using FluentValidation;

namespace Orion.Controllers.Requests.Product
{
    public class AddProductPriceRequest
    {
        public Guid ProductId { get; set; }
        public Guid ProductUnitId { get; set; }
        public int Price { get; set; }
    }

    public class AddProductPriceRequestValidator : AbstractValidator<AddProductPriceRequest>
    {
        public AddProductPriceRequestValidator()
        {
            RuleFor(req => req.ProductId).NotEmpty();
            RuleFor(req => req.ProductUnitId).NotEmpty();
            RuleFor(req => req.Price).GreaterThanOrEqualTo(0).LessThanOrEqualTo(2147483647);
        }
    }
}
