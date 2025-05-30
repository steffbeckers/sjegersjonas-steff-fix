using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Orion.Infrastructure.Controllers;
using Orion.Data.QueryHandlers.Relation;
using Orion.Infrastructure.Queries;
using Orion.Infrastructure.Queries.Pagination;
using Orion.Controllers.Requests.Relation;
using Orion.Application.CommandHandlers.Relation;
using Orion.Infrastructure.Queries.Filtering;

namespace Orion.Controllers
{
    [Route("api/relations")]
    [ApiController]
    public class RelationController : ApiController
    {
        private readonly IMediator _mediator;

        public RelationController(IMediator mediator,
            IMapper mapper) : base(mapper)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> RelationList([FromQuery] RelationFilterParams filterParams, [FromQuery] SortingParams sortParams, [FromQuery] PagingParams pagingParams)
        {
            var result = await _mediator.Send(new RelationListQuery(filterParams, sortParams, pagingParams));
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateRelation([FromBody] UpdateRelationRequest request)
        {

            var result = await _mediator.Send(new UpdateRelationCommand(request));
            if (result.IsSuccessful)
            {
                var queryResult = await _mediator.Send(new RelationDetailsQuery(result.Data));
                return Ok(queryResult);
            }

            return BadRequest(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddRelation([FromBody] AddRelationRequest request)
        {

            var result = await _mediator.Send(new AddRelationCommand(request));
            if (result.IsSuccessful)
            {
                var filterParams = new RelationFilterParams()
                {
                    Id = new FilterParam<Guid>[] {
                        new FilterParam<Guid>() { Operator = FilterOperator.Equal, Value = result.Data }
                    }
                };
                var relationListQuery = await _mediator.Send(new RelationListQuery(filterParams, new SortingParams(), new PagingParams()));
                if (relationListQuery.TotalItems == 1)
                {
                    return Ok(relationListQuery.Data[0]);
                }
            }

            return BadRequest(result);
        }

    }
}
