using EmployeePlatform.Server.DomainModel;

namespace EmployeePlatform.Server.Data.IRepository
{
    public interface IUserLocationRepository
    {
        AppUserLocation AssignUserToLocation(AppUserLocation newAppUserLocation);
    }
}
