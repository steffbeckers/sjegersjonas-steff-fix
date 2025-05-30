using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Orion.Domain.Entities;

namespace Orion.Data.Mappings
{
    public class QuotationLineMap : IEntityTypeConfiguration<QuotationLine>
    {
        public void Configure(EntityTypeBuilder<QuotationLine> builder)
        {
            builder.ToTable("QuotationLines");
            builder.HasKey(x => x.Id);
            builder.HasIndex(ql => new { ql.QuotationId, ql.SequenceNumber })
                .IsUnique();
            builder.Property(b => b.QuotationId)
                .IsRequired();
            builder.Property(b => b.Quantity)
                .IsRequired();
            builder.Property(b => b.Price)
                .IsRequired();
            builder.Property(b => b.ProductName)
                .IsRequired();
            builder.Property(b => b.ProductUnitId)
                .IsRequired();
            builder.Property(b => b.ValueAddedTaxRateId)
                .IsRequired();

            // Relations
            builder.HasOne<Quotation>(ql => ql.Quotation)
                .WithMany(q => q.QuotationLines)
                .HasForeignKey(ql => ql.QuotationId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne<Product>(ql => ql.Product)
                .WithMany(p => p.QuotationLines)
                .HasForeignKey(ql => ql.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne<ProductUnit>(ql => ql.ProductUnit)
                .WithMany(pu => pu.QuotationLines)
                .HasForeignKey(ql => ql.ProductUnitId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne<ValueAddedTaxRate>(ql => ql.ValueAddedTaxRate)
                .WithMany(vatr => vatr.QuotationLines)
                .HasForeignKey(ql => ql.ValueAddedTaxRateId)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
