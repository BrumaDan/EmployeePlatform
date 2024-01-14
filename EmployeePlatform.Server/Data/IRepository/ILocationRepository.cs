using EmployeePlatform.Server.DomainModel;

namespace EmployeePlatform.Server.Data.IRepository
{
    public interface ILocationRepository
    {
        Location AddLocation(Location newLocation);
        bool Exists(Guid id);
        IEnumerable<Location> GetLocations();
        void UpdateLocation(Location locationToUpdate);
    }
}
