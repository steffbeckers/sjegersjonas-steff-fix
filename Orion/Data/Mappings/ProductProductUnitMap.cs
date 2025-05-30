using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Orion.Domain.Entities;

namespace Orion.Data.Mappings
{
    public class ProductProductUnitMap : IEntityTypeConfiguration<ProductProductUnit>
    {
        public void Configure(EntityTypeBuilder<ProductProductUnit> builder)
        {
            builder.ToTable("ProductProductUnit");
            builder.HasKey(x => x.Id);
            builder.Property(b => b.ProductId)
                .IsRequired();
            builder.Property(b => b.ProductUnitId)
                .IsRequired();
            builder.Property(b => b.Price)
                .IsRequired();

            // Relations
            builder.HasOne<Product>(ppu => ppu.Product)
                .WithMany(p => p.ProductProductUnits)
                .HasForeignKey(ppu => ppu.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne<ProductUnit>(ppu => ppu.ProductUnit)
                .WithMany(pu => pu.ProductProductUnits)
                .HasForeignKey(ppu => ppu.ProductUnitId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
