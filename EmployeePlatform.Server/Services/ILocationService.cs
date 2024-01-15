using EmployeePlatform.Server.Models;

namespace EmployeePlatform.Server.Services
{
    public interface ILocationService
    {
        LocationModel AddLocation(LocationModel newLocation);
        bool DeleteLocation(Guid id);
        bool Exists(Guid id);
        IEnumerable<LocationModel> GetAllLocations();
        void UpdateLocation(LocationModel model);
    }
}
