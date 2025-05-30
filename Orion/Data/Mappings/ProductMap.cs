using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Orion.Domain.Entities;

namespace Orion.Data.Mappings
{
    public class ProductMap : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("Products");
            builder.HasKey(x => x.Id);
            builder.Property(b => b.Name)
                .IsRequired();
            builder.Property(b => b.Code)
                .IsRequired();
            builder.HasIndex(b => b.Code)
                .IsUnique();

            // Relations
            builder.HasOne<ProductCategory>(p => p.ProductCategory)
                .WithMany(pc => pc.Products)
                .HasForeignKey(p => p.ProductCategoryId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
