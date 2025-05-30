using MediatR;
using Orion.Controllers.Requests.Relation;
using Orion.Data.Repositories.Interfaces;
using Orion.Helpers;
using Orion.Infrastructure.Commands;

namespace Orion.Application.CommandHandlers.Relation
{
    public class AddRelationCommand : IRequest<CommandResult<Guid>>
    {
        public AddRelationRequest Request { get; set; }

        public AddRelationCommand(AddRelationRequest request)
        {
            Request = request;
        }
    }

    public class AddRelationCommandHandler : IRequestHandler<AddRelationCommand, CommandResult<Guid>>
    {
        private readonly IRelationRepository _relationRepository;

        public AddRelationCommandHandler(IRelationRepository relationRepository)
        {
            _relationRepository = relationRepository;
        }
        public async Task<CommandResult<Guid>> Handle(AddRelationCommand command, CancellationToken cancellationToken)
        {
            var name = StringHelper.TrimOrSetNull(command.Request.Name);
            var code = StringHelper.TrimOrSetNull(command.Request.Code);
            var vatNumber = (command.Request.IsCompany) ? StringHelper.TrimOrSetNull(command.Request.VatNumber) : null;
            var website = (command.Request.IsCompany) ? StringHelper.TrimOrSetNull(command.Request.Website) : null;
            var street = StringHelper.TrimOrSetNull(command.Request.Street);
            var postalCode = StringHelper.TrimOrSetNull(command.Request.PostalCode);
            var city = StringHelper.TrimOrSetNull(command.Request.City);
            var country = StringHelper.TrimOrSetNull(command.Request.Country);
            var language = StringHelper.TrimOrSetNull(command.Request.Language);
            var email = StringHelper.TrimOrSetNull(command.Request.Email);
            var phone = StringHelper.TrimOrSetNull(command.Request.Phone);
            var mobilePhone = StringHelper.TrimOrSetNull(command.Request.MobilePhone);

            var relationList = await _relationRepository.GetByName(name);
            if (relationList.Count > 0)
            {
                return CommandResult.Fail<Guid>(1001);
            }

            var relation = new Domain.Entities.Relation(name,
                command.Request.IsCompany,
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
            
            await _relationRepository.AddAsync(relation);
            await _relationRepository.SaveChangesAsync();

            return CommandResult.Ok(relation.Id);
        }
    }

}
