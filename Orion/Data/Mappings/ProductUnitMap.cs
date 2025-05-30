using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Orion.Domain.Entities;

namespace Orion.Data.Mappings
{
    public class ProductUnitMap : IEntityTypeConfiguration<ProductUnit>
    {
        public void Configure(EntityTypeBuilder<ProductUnit> builder)
        {
            builder.ToTable("ProductUnits");
            builder.HasKey(x => x.Id);
            builder.Property(b => b.Name)
                .IsRequired();

        }
    }
}
