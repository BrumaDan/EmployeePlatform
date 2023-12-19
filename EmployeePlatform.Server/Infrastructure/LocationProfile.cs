using AutoMapper;
using EmployeePlatform.Server.DomainModel;
using EmployeePlatform.Server.Models;

namespace EmployeePlatform.Server.Infrastructure
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
