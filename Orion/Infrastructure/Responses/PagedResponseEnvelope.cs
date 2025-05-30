namespace Orion.Infrastructure.Responses
{
    public class PagedResponseEnvelope<T> : ResponseEnvelope<T[]> where T : class
    {
        public PagedResponse Pagination { get; set; }
    }
}
