using Microsoft.AspNetCore.Identity;

namespace EmployeePlatform.Server.DomainModel
{
    public class AppUser : IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
