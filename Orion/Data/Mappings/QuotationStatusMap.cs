using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Orion.Domain.Entities;

namespace Orion.Data.Mappings
{
    public class QuotationStatusMap : IEntityTypeConfiguration<QuotationStatus>
    {
        public void Configure(EntityTypeBuilder<QuotationStatus> builder)
        {
            builder.ToTable("QuotationStatus");
            builder.HasKey(x => x.Id);
            builder.Property(b => b.Name)
                .IsRequired();
            builder.HasIndex(b => b.Name)
                .IsUnique();

        }
    }
}
