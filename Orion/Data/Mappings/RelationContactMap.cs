using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Orion.Domain.Entities;

namespace Orion.Data.Mappings
{
    public class RelationContactMap : IEntityTypeConfiguration<RelationContact>
    {
        public void Configure(EntityTypeBuilder<RelationContact> builder)
        {
            builder.ToTable("RelationContacts");
            builder.HasKey(x => x.Id);
            builder.Property(b => b.Name)
                .IsRequired();
            builder.Property(b => b.JobFunction).IsRequired(false);
            builder.Property(b => b.Street).IsRequired(false);
            builder.Property(b => b.PostalCode).IsRequired(false);
            builder.Property(b => b.City).IsRequired(false);
            builder.Property(b => b.Country).IsRequired(false);
            builder.Property(b => b.Language).IsRequired(false);
            builder.Property(b => b.Email).IsRequired(false);
            builder.Property(b => b.Phone).IsRequired(false);
            builder.Property(b => b.MobilePhone).IsRequired(false);
            builder.Property(b => b.RelationId).IsRequired();

            // Relations
            builder.HasOne<Relation>(r => r.Relation)
                .WithMany(rc => rc.RelationContacts)
                .HasForeignKey(r => r.RelationId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
