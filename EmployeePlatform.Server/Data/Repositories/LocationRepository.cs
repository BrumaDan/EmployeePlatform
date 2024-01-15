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
        public bool Exists(Guid id)
        {
            var exists = applicationDbContext.Locations.Count(x => x.Id == id);
            return exists == 1;
        }
        public void UpdateLocation(Location locationToUpdate)
        {
            applicationDbContext.Locations.Update(locationToUpdate);
            applicationDbContext.SaveChanges();
        }
        public bool DeleteLocation(Location locationToDelete)
        {
            var deletedLocation = applicationDbContext.Locations.Remove(locationToDelete);
            applicationDbContext.SaveChanges();
            return deletedLocation != null;
        }
        public Location GetLocationById(Guid id)
        {
            var location = applicationDbContext.Locations.FirstOrDefault(x => x.Id == id);
            return location;
        }
    }
}
