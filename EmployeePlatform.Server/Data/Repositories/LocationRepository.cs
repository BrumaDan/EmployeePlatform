using EmployeePlatform.Server.Data.IRepository;
using EmployeePlatform.Server.DomainModel;

namespace EmployeePlatform.Server.Data.Repositories
{
    public class LocationRepository : ILocationRepository
    {
        private readonly ApplicationDbContext applicationDbContext;

        public LocationRepository(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        public Location AddLocation(Location newLocation)
        {
            var addedLocation = applicationDbContext.Locations.Add(newLocation);
            applicationDbContext.SaveChanges();
            return addedLocation.Entity;
        }

        public IEnumerable<Location> GetLocations()
        {
            return applicationDbContext.Locations;
        }
    }
}
