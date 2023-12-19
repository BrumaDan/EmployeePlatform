using Microsoft.AspNetCore.Identity;

namespace EmployeePlatform.Server.DomainModel
{
    public class AppUserRole : IdentityUserRole<Guid>
    {
        public AppUser User { get; set; }
        public AppRole Role { get; set; }
    }
}
