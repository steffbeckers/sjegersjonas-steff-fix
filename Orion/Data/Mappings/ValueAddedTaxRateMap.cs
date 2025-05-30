using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Orion.Domain.Entities;

namespace Orion.Data.Mappings
{
    public class ValueAddedTaxRateMap : IEntityTypeConfiguration<ValueAddedTaxRate>
    {
        public void Configure(EntityTypeBuilder<ValueAddedTaxRate> builder)
        {
            builder.ToTable("ValueAddedTaxRates");
            builder.HasKey(x => x.Id);
            builder.Property(b => b.Percentage)
                .IsRequired();
            builder.HasIndex(b => b.Percentage)
                .IsUnique();
        }
    }
}