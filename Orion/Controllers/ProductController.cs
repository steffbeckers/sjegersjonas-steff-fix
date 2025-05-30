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

namespace Orion.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ApiController
    {
        private readonly IMediator _mediator;

        public ProductController(IMediator mediator,
            IMapper mapper) : base(mapper)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> ProductList([FromQuery] ProductFilterParams filterParams, [FromQuery] SortingParams sortParams, [FromQuery] PagingParams pagingParams)
        {
            var result = await _mediator.Send(new ProductListQuery(filterParams, sortParams, pagingParams));
            return Ok(result);
        }

        [HttpGet("{id}/details-vm")]
        public async Task<IActionResult> GetProductById(Guid id)
        {
            var filterParams = new ProductPriceFilterParams()
            {
                ProductId = new FilterParam<Guid>[] {
                    new FilterParam<Guid>() { Operator = FilterOperator.Equal, Value = id }
                }
            };
            var productDetailsQuery = await _mediator.Send(new ProductDetailsQuery(id));
            var productPriceListQuery = await _mediator.Send(new ProductPriceListQuery(filterParams, new SortingParams(), new PagingParams()));
            var result = new ProductDetailsResponse()
            {
                ProductDetails = productDetailsQuery,
                ProductPrices = new PagedResponseEnvelope<ProductPriceListDto>
                {
                    Data = _mapper.Map<ProductPriceListDto[]>(productPriceListQuery.Data),
                    Pagination = new PagedResponse(productPriceListQuery)
                }
            };

            return Ok(result);
        }

        [HttpPost("add-product-price")]
        public async Task<IActionResult> AddProductPrice([FromBody] AddProductPriceRequest request)
        {
            var result = await _mediator.Send(new AddProductPriceCommand(request));
            if (result.IsSuccessful)
            {
                var filterParams = new ProductPriceFilterParams()
                {
                    ProductProductUnitId = new FilterParam<Guid>[] {
                        new FilterParam<Guid>() { Operator = FilterOperator.Equal, Value = result.Data }
                    }
                };
                var productPriceListQuery = await _mediator.Send(new ProductPriceListQuery(filterParams, new SortingParams(), new PagingParams()));
                if(productPriceListQuery.TotalItems == 1)
                {
                    return Ok(productPriceListQuery.Data[0]);
                }
                
            }

            return BadRequest(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProduct([FromBody] UpdateProductRequest request)
        {

            var result = await _mediator.Send(new UpdateProductCommand(request));
            if (result.IsSuccessful)
            {
                var queryResult = await _mediator.Send(new ProductDetailsQuery(result.Data));
                return Ok(queryResult);
            }

            return BadRequest(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] AddProductRequest request)
        {

            var result = await _mediator.Send(new AddProductCommand(request));
            if (result.IsSuccessful)
            {
                var filterParams = new ProductFilterParams()
                {
                    Id = new FilterParam<Guid>[] {
                        new FilterParam<Guid>() { Operator = FilterOperator.Equal, Value = result.Data }
                    }
                };
                var productListQuery = await _mediator.Send(new ProductListQuery(filterParams, new SortingParams(), new PagingParams()));
                if (productListQuery.TotalItems == 1)
                {
                    return Ok(productListQuery.Data[0]);
                }
            }

            return BadRequest(result);
        }

        [HttpPut("product-prices")]
        public async Task<IActionResult> UpdateProductPrice([FromBody] UpdateProductPriceRequest request)
        {

            var result = await _mediator.Send(new UpdateProductPriceCommand(request));
            if (result.IsSuccessful)
            {
                var filterParams = new ProductPriceFilterParams()
                {
                    ProductProductUnitId = new FilterParam<Guid>[] {
                        new FilterParam<Guid>() { Operator = FilterOperator.Equal, Value = result.Data }
                    }
                };
                var productPriceListQuery = await _mediator.Send(new ProductPriceListQuery(filterParams, new SortingParams(), new PagingParams()));
                if (productPriceListQuery.TotalItems == 1)
                {
                    return Ok(productPriceListQuery.Data[0]);
                }
            }

            return BadRequest(result);
        }

        [HttpDelete("product-prices/{id}")]
        public async Task<IActionResult> DeleteProductPrice(Guid id)
        {
            var result = await _mediator.Send(new DeleteProductPriceCommand(id));
            if (result.IsSuccessful)
            {
                return Ok(new { id });
            }

            return BadRequest(result);
        }

    }
}
