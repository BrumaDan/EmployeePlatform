using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using CoffeeShopScheduler.DomainModel;
using CoffeeShopScheduler.Models;
namespace CoffeeShopScheduler.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Location>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("locationId");
                entity.Property(e => e.PostalCode);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(50).HasColumnName("name");
                entity.HasIndex(e => e.Name, "idx_name");
                entity.Property(e => e.Description).HasColumnName("description");
            });
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("employeeId");
                entity
                    .Property(e => e.ContractType)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("contractType");
                entity.Property(e => e.Status).HasColumnName("status");
                entity.HasIndex(e => e.ContractType, "idx_contractType");
                entity.HasIndex(e => e.Status, "idx_status");
                entity.HasIndex(e => e.LocationId, "idx_locationId");

                //Fk
                entity
                    .HasOne(emp => emp.Location)
                    .WithMany(l => l.Employees)
                    .HasForeignKey(e => e.LocationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Employee_Location");
                entity.Property(emp => emp.LocationId).HasColumnName("locationId");
            });
        }
    }
}
