namespace Orion.Infrastructure.Responses
{
    public class ResponseEnvelope<T> where T : class
    {
        public T Data { get; set; }
    }
}
