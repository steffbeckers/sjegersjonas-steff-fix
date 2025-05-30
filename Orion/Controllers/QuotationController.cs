using Orion.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using AutoMapper;
using Orion.Infrastructure.Queries;
using Orion.Infrastructure.Queries.Pagination;
using Orion.Controllers.Requests.Product;
using Orion.Data.QueryHandlers.Product;
using Orion.Application.Dtos.Product;
using Orion.Infrastructure.Queries.Filtering;
using Orion.Controllers.Responses.Product;
using Orion.Infrastructure.Responses;
using Orion.Application.CommandHandlers.Product;
using Orion.Controllers.Requests.Quotation;
using Orion.Data.QueryHandlers.Quotation;

namespace Orion.Controllers
{
    [Route("api/quotations")]
    [ApiController]
    public class QuotationController : ApiController
    {
        private readonly IMediator _mediator;

        public QuotationController(IMediator mediator,
            IMapper mapper) : base(mapper)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> QuotationList([FromQuery] QuotationFilterParams filterParams, [FromQuery] SortingParams sortParams, [FromQuery] PagingParams pagingParams)
        {
            var result = await _mediator.Send(new QuotationListQuery(filterParams, sortParams, pagingParams));
            return Ok(result);
        }

    }
}
