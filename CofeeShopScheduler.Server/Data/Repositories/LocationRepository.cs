using CoffeeShopScheduler.Data.IRepository;
using CoffeeShopScheduler.DomainModel;

namespace CoffeeShopScheduler.Data.Repositories
{
    public class LocationRepository : ILocation
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
