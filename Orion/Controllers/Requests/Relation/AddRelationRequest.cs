using FluentValidation;

namespace Orion.Controllers.Requests.Relation
{
    public class AddRelationRequest
    {
        public string Name { get; set; }
        public string? Code { get; set; }
        public string? VatNumber { get; set; }
        public string? Website { get; set; }
        public string? Street { get; set; }
        public string? PostalCode { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public string? Language { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? MobilePhone { get; set; }
        public bool IsCompany { get; set; }
    }

    public class AddRelationRequestValidator : AbstractValidator<AddRelationRequest>
    {
        public AddRelationRequestValidator()
        {
            RuleFor(req => req.Name).NotEmpty().MaximumLength(120);
            RuleFor(req => req.Code).MaximumLength(120);
            RuleFor(req => req.VatNumber).MaximumLength(25);
            RuleFor(req => req.Website).MaximumLength(2048);
            RuleFor(req => req.Street).MaximumLength(95);
            RuleFor(req => req.PostalCode).MaximumLength(10);
            RuleFor(req => req.City).MaximumLength(35);
            RuleFor(req => req.Country).MaximumLength(50);
            RuleFor(req => req.Language).MaximumLength(10);
            RuleFor(req => req.Email).MaximumLength(62);
            RuleFor(req => req.Phone).MaximumLength(30);
            RuleFor(req => req.MobilePhone).MaximumLength(30);
            RuleFor(req => req.IsCompany).NotEmpty();
        }
    }

}
