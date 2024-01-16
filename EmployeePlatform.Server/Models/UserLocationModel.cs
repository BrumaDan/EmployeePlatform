using EmployeePlatform.Server.DomainModel;

namespace EmployeePlatform.Server.Models
{
    public class UserLocationModel : BaseModel
    {
        public Guid UserId { get; set; }
        public Guid LocationId { get; set; }
        //public AppUser User { get; set; }
        //public Location Location { get; set; }
    }
}
