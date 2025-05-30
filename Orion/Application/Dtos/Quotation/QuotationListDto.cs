namespace Orion.Application.Dtos.Quotation
{
    public class QuotationListDto
    {
        public string QuotationNumber { get; set; }
        public DateTime ValidTill { get; set; }
        public DateTime QuotationDate { get; set; }
        public Guid RelationId { get; set; }
        public string Description { get; set; }
        public string Reference { get; set; }
        public string QuotationStatus { get; set; }
        public Guid QuotationStatusId { get; set; }
    }
}
