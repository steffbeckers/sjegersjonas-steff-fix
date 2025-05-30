using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Orion.Domain.Entities;

namespace Orion.Data.Mappings
{
    public class QuotationMap : IEntityTypeConfiguration<Quotation>
    {
        public void Configure(EntityTypeBuilder<Quotation> builder)
        {
            builder.ToTable("Quotations");
            builder.HasKey(x => x.Id);
            builder.Property<string>(b => b.QuotationNumber)
                .IsRequired();
            builder.HasIndex(b => b.QuotationNumber)
                .IsUnique();
            builder.Property<DateTime>(b => b.QuotationDate)
                .IsRequired();
            builder.Property<DateTime>(b => b.QuotationDate)
                .HasColumnType("DateOnly");
            builder.Property<Guid>(b => b.RelationId)
                .IsRequired();
            builder.Property<Guid>(b => b.QuotationStatusId)
                .IsRequired();

            // Relations
            builder.HasOne<Relation>(q => q.Relation)
                .WithMany(r => r.Quotations)
                .HasForeignKey(q => q.RelationId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne<QuotationStatus>(q => q.QuotationStatus)
                .WithMany(qs => qs.Quotations)
                .HasForeignKey(q => q.QuotationStatusId)
                .OnDelete(DeleteBehavior.Restrict);

            //builder.HasOne<IdentityUser>(q => q.ContactPerson) // TODO
            //    .WithMany(iu => iu.)
            //    .HasForeignKey(q => q.ContactPersonId)
            //    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
