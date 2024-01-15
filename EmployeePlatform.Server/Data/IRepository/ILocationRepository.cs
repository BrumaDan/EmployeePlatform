using EmployeePlatform.Server.DomainModel;

namespace EmployeePlatform.Server.Data.IRepository
{
    public interface ILocationRepository
    {
        Location AddLocation(Location newLocation);
        bool DeleteLocation(Location locationToDelete);
        bool Exists(Guid id);
        Location GetLocationById(Guid id);
        IEnumerable<Location> GetLocations();
        void UpdateLocation(Location locationToUpdate);
    }
}
