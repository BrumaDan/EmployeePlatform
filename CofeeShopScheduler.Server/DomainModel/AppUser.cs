using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace CofeeShopScheduler.Server.DomainModel
{
    public class AppUser : IdentityUser<Guid>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
