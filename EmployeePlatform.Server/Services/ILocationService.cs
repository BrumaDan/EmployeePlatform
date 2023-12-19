using EmployeePlatform.Server.Models;

namespace EmployeePlatform.Server.Services
{
    public interface ILocationService
    {
        LocationModel AddLocation(LocationModel newLocation);
        IEnumerable<LocationModel> GetAllLocations();

    }
}
