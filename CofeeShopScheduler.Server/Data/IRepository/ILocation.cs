using CoffeeShopScheduler.DomainModel;

namespace CoffeeShopScheduler.Data.IRepository
{
    public interface ILocation
    {
        Location AddLocation(Location newLocation);
        IEnumerable<Location> GetLocations();
    }
}
