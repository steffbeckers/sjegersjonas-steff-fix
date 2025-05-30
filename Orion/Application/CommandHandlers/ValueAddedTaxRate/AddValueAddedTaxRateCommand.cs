using MediatR;
using Orion.Data.Repositories.Interfaces;
using Orion.Infrastructure.Commands;

namespace Orion.Application.CommandHandlers.ValueAddedTaxRate
{
    public class AddValueAddedTaxRateCommand : IRequest<CommandResult<Guid>>
    {
        public int Percentage { get; set; }

        public static AddValueAddedTaxRateCommand Create(int percentage) => new AddValueAddedTaxRateCommand
        {
            Percentage = percentage,
        };
    }

    public class AddValueAddedTaxRateCommandHandler : IRequestHandler<AddValueAddedTaxRateCommand, CommandResult<Guid>>
    {
        private readonly IValueAddedTaxRateRepository _valueAddedTaxRateRepository;

        public AddValueAddedTaxRateCommandHandler(IValueAddedTaxRateRepository valueAddedTaxRateRepository)
        {
            _valueAddedTaxRateRepository = valueAddedTaxRateRepository;
        }
        public async Task<CommandResult<Guid>> Handle(AddValueAddedTaxRateCommand command, CancellationToken cancellationToken)
        {

            var valueAddedTaxRate = new Domain.Entities.ValueAddedTaxRate(command.Percentage);

            await _valueAddedTaxRateRepository.AddAsync(valueAddedTaxRate);
            await _valueAddedTaxRateRepository.SaveChangesAsync();

            return CommandResult.Ok(valueAddedTaxRate.Id);
        }
    }

}
