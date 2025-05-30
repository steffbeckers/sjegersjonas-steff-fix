using Orion.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using AutoMapper;
using Orion.Infrastructure.Queries;
using Orion.Infrastructure.Queries.Pagination;
using Orion.Controllers.Requests.Product;
using Orion.Data.QueryHandlers.ProductCategory;
using Orion.Controllers.Requests.ProductCategory;
using Orion.Application.CommandHandlers.ProductCategory;
using Orion.Infrastructure.Queries.Filtering;

namespace Orion.Controllers
{
    [Route("api/product-categories")]
    [ApiController]
    public class ProductCategoryController : ApiController
    {
        private readonly IMediator _mediator;

        public ProductCategoryController(IMediator mediator,
            IMapper mapper) : base(mapper)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> ProductCategoryList([FromQuery] ProductCategoryFilterParams filterParams, [FromQuery] SortingParams sortParams, [FromQuery] PagingParams pagingParams)
        {
            var result = await _mediator.Send(new ProductCategoryListQuery(filterParams, sortParams, pagingParams));
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductCategoryById(Guid id)
        {
            var result = await _mediator.Send(new ProductCategoryDetailsQuery(id));
            return Ok(result);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchProductCategory(string? name, int? id)
        {
            var result = await _mediator.Send(new ProductCategorySearchQuery(name, id));
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddProductCategory([FromBody] AddProductCategoryRequest request)
        {
            var command = _mapper.Map<AddProductCategoryRequest, AddProductCategoryCommand>(request);
            var result = await _mediator.Send(command);
            if (result.IsSuccessful)
            {
                var queryResult = await _mediator.Send(new ProductCategoryDetailsQuery(result.Data));
                return Ok(queryResult);
            }

            return BadRequest(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductCategory(Guid id)
        {
            var result = await _mediator.Send(DeleteProductCategoryCommand.Create(id));
            if (result.IsSuccessful)
            {
                return NoContent();
            }

            return BadRequest(result);
        }

    }
}
