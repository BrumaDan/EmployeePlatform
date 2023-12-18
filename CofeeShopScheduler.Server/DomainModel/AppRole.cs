using Microsoft.AspNetCore.Identity;

namespace CofeeShopScheduler.Server.DomainModel
{
    public class AppRole:IdentityRole<Guid>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
