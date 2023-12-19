using AutoMapper;
using EmployeePlatform.Server.DomainModel;
using EmployeePlatform.Server.DTOs;
namespace EmployeePlatform.Server.Infrastructure
{
    public class AppUserProfile: Profile
    {
           public AppUserProfile()
    {   //map from user to register dto
        //another test
        CreateMap<AppUser, RegisterDto>();
        CreateMap<RegisterDto, AppUser>();
    }
}
}
