using CoffeeShopScheduler.DomainModel;

namespace CoffeeShopScheduler.Data.IRepository
{
    public interface ILocationRepository
    {
        Location AddLocation(Location newLocation);
        IEnumerable<Location> GetLocations();
    }
}
