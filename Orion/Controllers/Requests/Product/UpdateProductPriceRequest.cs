using FluentValidation;

namespace Orion.Controllers.Requests.Product
{
    public class UpdateProductPriceRequest
    {
        public Guid ProductProductUnitId { get; set; }
        public int Price { get; set; }
    }

    public class UpdateProductPriceRequestValidator : AbstractValidator<UpdateProductPriceRequest>
    {
        public UpdateProductPriceRequestValidator()
        {
            RuleFor(req => req.ProductProductUnitId).NotEmpty();
            RuleFor(req => req.Price).GreaterThanOrEqualTo(0).LessThanOrEqualTo(2147483647);
        }
    }

}
