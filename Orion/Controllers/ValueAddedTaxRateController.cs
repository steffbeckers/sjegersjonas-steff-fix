using Orion.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using AutoMapper;
using Orion.Infrastructure.Queries;
using Orion.Infrastructure.Queries.Pagination;
using Orion.Controllers.Requests.Product;
using Orion.Data.QueryHandlers.ValueAddedTaxRate;
using Orion.Controllers.Requests.ValueAddedTaxRate;
using Orion.Application.CommandHandlers.ValueAddedTaxRate;
using Orion.Infrastructure.Queries.Filtering;

namespace Orion.Controllers
{
    [Route("api/value-added-tax-rates")]
    [ApiController]
    public class ValueAddedTaxRateController : ApiController
    {
        private readonly IMediator _mediator;

        public ValueAddedTaxRateController(IMediator mediator,
            IMapper mapper) : base(mapper)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> ValueAddedTaxRateList([FromQuery] ValueAddedTaxRateFilterParams filterParams, [FromQuery] SortingParams sortParams, [FromQuery] PagingParams pagingParams)
        {
            var result = await _mediator.Send(new ValueAddedTaxRateListQuery(filterParams, sortParams, pagingParams));
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetValueAddedTaxRateById(Guid id)
        {
            var result = await _mediator.Send(new ValueAddedTaxRateDetailsQuery(id));
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddValueAddedTaxRate([FromBody] AddValueAddedTaxRateRequest request)
        {
            var command = _mapper.Map<AddValueAddedTaxRateRequest, AddValueAddedTaxRateCommand>(request);
            var result = await _mediator.Send(command);
            if (result.IsSuccessful)
            {
                var queryResult = await _mediator.Send(new ValueAddedTaxRateDetailsQuery(result.Data));
                return Ok(queryResult);
            }

            return BadRequest(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteValueAddedTaxRate(Guid id)
        {
            var result = await _mediator.Send(DeleteValueAddedTaxRateCommand.Create(id));
            if (result.IsSuccessful)
            {
                return NoContent();
            }

            return BadRequest(result);
        }

    }
}
