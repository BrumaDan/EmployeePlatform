using CoffeeShopScheduler.Models;

namespace CoffeeShopScheduler.Services
{
    public interface ILocationService
    {
        LocationModel AddLocation(LocationModel newLocation);
        IEnumerable<LocationModel> GetAllLocations();
    }
}
