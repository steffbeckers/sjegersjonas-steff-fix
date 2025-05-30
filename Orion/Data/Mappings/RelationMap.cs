using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Orion.Domain.Entities;

namespace Orion.Data.Mappings
{
    public class RelationMap : IEntityTypeConfiguration<Relation>
    {
        public void Configure(EntityTypeBuilder<Relation> builder)
        {
            builder.ToTable("Relations");
            builder.HasKey(x => x.Id);
            builder.Property(b => b.Name)
                .IsRequired();
            builder.Property(b => b.Code).IsRequired(false);
            builder.Property(b => b.VatNumber).IsRequired(false);
            builder.Property(b => b.Website).IsRequired(false);
            builder.Property(b => b.Street).IsRequired(false);
            builder.Property(b => b.PostalCode).IsRequired(false);
            builder.Property(b => b.City).IsRequired(false);
            builder.Property(b => b.Country).IsRequired(false);
            builder.Property(b => b.Language).IsRequired(false);
            builder.Property(b => b.Email).IsRequired(false);
            builder.Property(b => b.Phone).IsRequired(false);
            builder.Property(b => b.MobilePhone).IsRequired(false);
            builder.Property(b => b.IsCompany)
                .IsRequired();

        }
    }
}
