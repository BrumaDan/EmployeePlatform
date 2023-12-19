using Microsoft.AspNetCore.Identity;

namespace EmployeePlatform.Server.DomainModel
{
    public class AppRole : IdentityRole<Guid>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
