using MediatR;
using Orion.Application.Errors;
using Orion.Controllers.Requests.Relation;
using Orion.Data.Repositories.Interfaces;
using Orion.Helpers;
using Orion.Infrastructure.Commands;

namespace Orion.Application.CommandHandlers.Relation
{
    public class UpdateRelationCommand : IRequest<CommandResult<Guid>>
    {
        public UpdateRelationRequest Request { get; set; }

        public UpdateRelationCommand(UpdateRelationRequest request)
        {
            Request = request;
        }
    }

    public class UpdateRelationCommandHandler : IRequestHandler<UpdateRelationCommand, CommandResult<Guid>>
    {
        private readonly IRelationRepository _relationRepository;

        public UpdateRelationCommandHandler(IRelationRepository relationRepository)
        {
            _relationRepository = relationRepository;
        }
        public async Task<CommandResult<Guid>> Handle(UpdateRelationCommand command, CancellationToken cancellationToken)
        {
            var name = StringHelper.TrimOrSetNull(command.Request.Name);
            var code = StringHelper.TrimOrSetNull(command.Request.Code);
            var vatNumber = StringHelper.TrimOrSetNull(command.Request.VatNumber);
            var website = StringHelper.TrimOrSetNull(command.Request.Website);
            var street = StringHelper.TrimOrSetNull(command.Request.Street);
            var postalCode = StringHelper.TrimOrSetNull(command.Request.PostalCode);
            var city = StringHelper.TrimOrSetNull(command.Request.City);
            var country = StringHelper.TrimOrSetNull(command.Request.Country);
            var language = StringHelper.TrimOrSetNull(command.Request.Language);
            var email = StringHelper.TrimOrSetNull(command.Request.Email);
            var phone = StringHelper.TrimOrSetNull(command.Request.Phone);
            var mobilePhone = StringHelper.TrimOrSetNull(command.Request.MobilePhone);

            var relation = await _relationRepository.GetById(command.Request.Id);
            if (relation == null)
            {
                return CommandResult.Fail<Guid>(1000);
            }

            var relationList = await _relationRepository.GetByName(name);
            foreach(var p in relationList)
            {
                if(!p.Id.Equals(relation.Id)) { return CommandResult.Fail<Guid>(1001); }
            }

            relation.Update(
                name,
                code,
                vatNumber,
                website,
                street,
                postalCode,
                city,
                country,
                language,
                email,
                phone,
                mobilePhone);
            await _relationRepository.SaveChangesAsync();

            return CommandResult.Ok(relation.Id);
        }
    }

}
