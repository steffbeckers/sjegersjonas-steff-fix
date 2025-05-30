using Microsoft.Extensions.DependencyInjection;
using Orion.Data.Repositories;
using Orion.Data.Repositories.Interfaces;
using Orion.Infrastructure.Repository;

namespace Orion.Infrastructure.DependencyInjection
{
    public static class RepositoryConfigurator
    {
        public static void Configure(IServiceCollection services)
        {
            services.AddScoped(typeof(IRepositoryBase<>), typeof(RepositoryBase<>));
            services.AddScoped<IValueAddedTaxRateRepository, ValueAddedTaxRateRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IProductCategoryRepository, ProductCategoryRepository>();
            services.AddScoped<IProductUnitRepository, ProductUnitRepository>();
            services.AddScoped<IProductProductUnitRepository, ProductProductUnitRepository>();
            services.AddScoped<IRelationRepository, RelationRepository>();
        }
    }
}
