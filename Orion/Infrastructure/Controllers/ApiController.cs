using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Orion.Infrastructure.Responses;
using Orion.Infrastructure.Queries.Pagination;

namespace Orion.Infrastructure.Controllers
{
    public class ApiController : ControllerBase
    {
        protected readonly IMapper _mapper;

        public ApiController(IMapper mapper)
        {
            _mapper = mapper;
        }

        protected OkObjectResult Ok<TSource>(PagedResult<TSource> pagedResult)
            where TSource : class
        {
            return new OkObjectResult(new PagedResponseEnvelope<TSource>
            {
                Data = _mapper.Map<TSource[]>(pagedResult.Data),
                Pagination = new PagedResponse(pagedResult)
            });
        }

        protected OkObjectResult Ok<TSource, TResponse>(PagedResult<TSource> pagedResult)
            where TSource : class
            where TResponse : class
        {
            return new OkObjectResult(new PagedResponseEnvelope<TResponse>
            {
                Data = _mapper.Map<TResponse[]>(pagedResult.Data),
                Pagination = new PagedResponse(pagedResult)
            });
        }

        protected OkObjectResult Ok<TSource, TResponse>(TSource result)
            where TSource : class
            where TResponse : class
        {
            return new OkObjectResult(_mapper.Map<TResponse>(result));
        }
    }
}
