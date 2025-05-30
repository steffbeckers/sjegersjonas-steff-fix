using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Orion.Data.Mappings;
using Orion.Domain.Entities;

namespace Orion.Data
{
    public class ApplicationContext : IdentityDbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }

        public DbSet<Relation> Relations { get; set; }
        public DbSet<RelationContact> RelationContacts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<ProductProductUnit> ProductProductUnit { get; set; }
        public DbSet<ProductUnit> ProductUnits { get; set; }
        public DbSet<ValueAddedTaxRate> ValueAddedTaxRates { get; set; }
        public DbSet<QuotationStatus> QuotationStatus { get; set; }
        public DbSet<Quotation> Quotations { get; set; }
        public DbSet<QuotationLine> QuotationLines { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new ProductMap());
            modelBuilder.ApplyConfiguration(new ProductCategoryMap());
            modelBuilder.ApplyConfiguration(new ProductProductUnitMap());
            modelBuilder.ApplyConfiguration(new ProductUnitMap());
            modelBuilder.ApplyConfiguration(new ValueAddedTaxRateMap());
            modelBuilder.ApplyConfiguration(new RelationMap());
            modelBuilder.ApplyConfiguration(new RelationContactMap());
            modelBuilder.ApplyConfiguration(new QuotationStatusMap());
            modelBuilder.ApplyConfiguration(new QuotationMap());
            modelBuilder.ApplyConfiguration(new QuotationLineMap());
        }
    }
}
