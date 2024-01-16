using AutoMapper;
using EmployeePlatform.Server.DomainModel;
using EmployeePlatform.Server.Models;

namespace EmployeePlatform.Server.Infrastructure
{
    public class UserLocationProfile : Profile
    {
        public UserLocationProfile()
        {
            CreateMap<AppUserLocation, UserLocationModel>();
            CreateMap<UserLocationModel, AppUserLocation>();
        }
    }
}
