using EmployeePlatform.Server.Models;

namespace EmployeePlatform.Server.Services
{
    public interface IUserLocationService
    {
        UserLocationModel AssignUserToLocation(UserLocationModel newLocationAssignment);
    }
}
