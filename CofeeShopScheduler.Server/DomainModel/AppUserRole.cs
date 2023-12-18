using Microsoft.AspNetCore.Identity;

namespace CofeeShopScheduler.Server.DomainModel
{
    public class AppUserRole:IdentityUserRole<Guid>
    {
        public AppUser User { get; set; }
        public AppRole Role { get; set; }
    }
}
