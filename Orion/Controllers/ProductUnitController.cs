using Orion.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using AutoMapper;
using Orion.Infrastructure.Queries;
using Orion.Infrastructure.Queries.Pagination;
using Orion.Data.QueryHandlers.ProductUnit;
using Orion.Controllers.Requests.ProductUnit;
using Orion.Application.CommandHandlers.ProductUnit;

namespace Orion.Controllers
{
    [Route("api/product-units")]
    [ApiController]
    public class ProductUnitController : ApiController
    {
        private readonly IMediator _mediator;

        public ProductUnitController(IMediator mediator,
            IMapper mapper) : base(mapper)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> ProductUnitList([FromQuery] ProductUnitFilterParams filterParams, [FromQuery] SortingParams sortParams, [FromQuery] PagingParams pagingParams)
        {
            var result = await _mediator.Send(new ProductUnitListQuery(filterParams, sortParams, pagingParams));
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductUnitById(Guid id)
        {
            var result = await _mediator.Send(new ProductUnitDetailsQuery(id));
            return Ok(result);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchProductUnit(string? name, int? id)
        {
            var result = await _mediator.Send(new ProductUnitSearchQuery(name, id));
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddProductUnit([FromBody] AddProductUnitRequest request)
        {
            var command = _mapper.Map<AddProductUnitRequest, AddProductUnitCommand>(request);
            var result = await _mediator.Send(command);
            if (result.IsSuccessful)
            {
                var queryResult = await _mediator.Send(new ProductUnitDetailsQuery(result.Data));
                return Ok(queryResult);
            }

            return BadRequest(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductUnit(Guid id)
        {
            var result = await _mediator.Send(DeleteProductUnitCommand.Create(id));
            if (result.IsSuccessful)
            {
                return NoContent();
            }

            return BadRequest(result);
        }

    }
}
