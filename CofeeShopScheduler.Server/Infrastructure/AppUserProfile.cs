using CofeeShopScheduler.Server.DomainModel;
using CofeeShopScheduler.Server.Models;
using AutoMapper;
using CoffeeShopScheduler.DomainModel;
using CoffeeShopScheduler.Models;
using CofeeShopScheduler.Server.DTOs;


namespace CofeeShopScheduler.Server.Infrastructure
{
    public class AppUserProfile : Profile
    {
        public AppUserProfile()
        {   //map from user to register dto
            //another test
            CreateMap<AppUser, RegisterDto>();
            CreateMap<RegisterDto, AppUser>();
        }
    }
}
