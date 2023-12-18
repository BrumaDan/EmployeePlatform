using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using CoffeeShopScheduler.DomainModel;
using CoffeeShopScheduler.Models;
using CofeeShopScheduler.Server.DomainModel;
using Microsoft.AspNetCore.Identity;

namespace CoffeeShopScheduler.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser, AppRole, Guid, IdentityUserClaim<Guid>,
                                        AppUserRole, IdentityUserLogin<Guid>,
                                        IdentityRoleClaim<Guid>, IdentityUserToken<Guid>>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public virtual DbSet<Location> Locations { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            modelBuilder.Entity<AppRole>()
             .HasMany(ur => ur.UserRoles)
             .WithOne(u => u.Role)
             .HasForeignKey(ur => ur.RoleId)
             .IsRequired();

            modelBuilder.Entity<Location>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("locationId");
                entity.Property(e => e.PostalCode);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(50).HasColumnName("name");
                entity.HasIndex(e => e.Name, "idx_name");
                entity.Property(e => e.Description).HasColumnName("description");
            });

        }
    }
}
