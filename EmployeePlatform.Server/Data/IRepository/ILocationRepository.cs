using EmployeePlatform.Server.DomainModel;

namespace EmployeePlatform.Server.Data.IRepository
{
    public interface ILocationRepository
    {
        Location AddLocation(Location newLocation);
        IEnumerable<Location> GetLocations();
    }
}
