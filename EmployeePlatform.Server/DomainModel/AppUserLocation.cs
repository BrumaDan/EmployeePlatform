using System.Reflection.Metadata.Ecma335;

namespace EmployeePlatform.Server.DomainModel
{
    public class AppUserLocation : BaseDomainModel
    {
        public Guid UserId { get; set; }
        public Guid LocationId { get; set; }
        public  AppUser User { get; set; }
        public Location Location { get; set; }
    }
}
