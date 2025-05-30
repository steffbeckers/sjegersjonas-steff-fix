namespace Orion.Application.Dtos.Relation
{
    public class RelationListDto
    {
        public Guid RelationId { get; set; }
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
}
