using MediatR;
using Orion.Data.Repositories.Interfaces;
using Orion.Infrastructure.Commands;

namespace Orion.Application.CommandHandlers.ValueAddedTaxRate
{
    public class DeleteValueAddedTaxRateCommand : IRequest<CommandResult<Guid>>
    {
        public Guid Id { get; set; }

        public static DeleteValueAddedTaxRateCommand Create(Guid id) => new DeleteValueAddedTaxRateCommand
        {
            Id = id,
        };
    }

    public class DeleteValueAddedTaxRateCommandHandler : IRequestHandler<DeleteValueAddedTaxRateCommand, CommandResult<Guid>>
    {
        private readonly IValueAddedTaxRateRepository _valueAddedTaxRateRepository;

        public DeleteValueAddedTaxRateCommandHandler(IValueAddedTaxRateRepository valueAddedTaxRateRepository)
        {
            _valueAddedTaxRateRepository = valueAddedTaxRateRepository;
        }
        public async Task<CommandResult<Guid>> Handle(DeleteValueAddedTaxRateCommand command, CancellationToken cancellationToken)
        {
            var valueAddedTaxRate = await _valueAddedTaxRateRepository.GetById(command.Id);
            if (valueAddedTaxRate == null)
            {
                return CommandResult.Fail<Guid>(1000);
            }

            await _valueAddedTaxRateRepository.Delete(valueAddedTaxRate.Id);
            await _valueAddedTaxRateRepository.SaveChangesAsync();

            return CommandResult.Ok(valueAddedTaxRate.Id);
        }
    }
}
