using Microsoft.Extensions.DependencyInjection;
using Orion.Infrastructure.Connection;

namespace Orion.Infrastructure.DependencyInjection
{
    public static class ConnectionConfigurator
    {
        public static void Configure(IServiceCollection services, string connectionString)
        {
            services.AddSingleton<IConnectionFactory>(new ConnectionFactory(connectionString));
        }
    }
}
