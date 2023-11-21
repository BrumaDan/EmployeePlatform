using AutoMapper;
using CoffeeShopScheduler.DomainModel;
using CoffeeShopScheduler.Models;

namespace CoffeeShopScheduler.Infrastructure
{
    public class LocationProfile : Profile
    {
        public LocationProfile()
        {
            CreateMap<Location, LocationModel>();
            CreateMap<LocationModel, Location>();
        }
    }
}
