using Orion.Infrastructure.Domain.Entity;

namespace Orion.Domain.Entities
{
    public class Relation : SoftDeletableEntityBase
    {
        public string Name { get; set; } // Company Name or Person Name
        public string? Code { get; set; }
        public string? VatNumber { get; set; } // Only for IsCompany = true
        public string? Website { get; set; } // Only for IsCompany = true
        public string? Street { get; set; }
        public string? PostalCode { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public string? Language { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? MobilePhone { get; set; }
        public bool IsCompany { get; set; }
        public List<RelationContact> RelationContacts { get; set; }
        public List<Quotation> Quotations { get; set; }

        public Relation(
            string name,
            bool isCompany,
            string? code,
            string? vatNumber,
            string? website,
            string? street,
            string? postalCode,
            string? city,
            string? country,
            string? language,
            string? email,
            string? phone,
            string? mobilePhone
            )
        {
            Name = name;
            Code = code;
            VatNumber = vatNumber;
            Website = website;
            Street = street;
            PostalCode = postalCode;
            City = city;
            Country = country;
            Language = language;
            Email = email;
            Phone = phone;
            MobilePhone = mobilePhone;
            IsCompany = isCompany;
        }

        public void Update(
            string name,
            string? code,
            string? vatNumber,
            string? website,
            string? street,
            string? postalCode,
            string? city,
            string? country,
            string? language,
            string? email,
            string? phone,
            string? mobilePhone)
        {
            Name = name;
            Code = code;
            VatNumber = vatNumber;
            Website = website;
            Street = street;
            PostalCode = postalCode;
            City = city;
            Country = country;
            Language = language;
            Email = email;
            Phone = phone;
            MobilePhone = mobilePhone;
        }

    }
}
