using AutoMapper;
using CofeeShopScheduler.Server.Data.IRepository;
using CofeeShopScheduler.Server.Data.Repositories;
using CofeeShopScheduler.Server.DomainModel;
using CofeeShopScheduler.Server.Models;
using CoffeeShopScheduler.Data.Repositories;
using CoffeeShopScheduler.Models;
using System.Security.Principal;

namespace CofeeShopScheduler.Server.Services
{
    public class AppUserService :IAppUserService
    {
        private readonly IAppUserRepository repository;
        private readonly IMapper mapper;


        public AppUserService(IAppUserRepository repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        //public AppUserModel GetUser(Guid id)
        //{
        //    var appUser = repository.GetUser(id);
        //    var appUserModel = mapper.Map<AppUserModel>(appUser);
        //    return appUserModel;    
        //}

        //public IEnumerable<AppUserModel> GetUsers()
        //{
        //    var allAppUsers = repository.GetUsers();
        //    var AppUsersModels = mapper.Map<IEnumerable<AppUserModel>>(allAppUsers);
        //    return AppUsersModels;
        //}

        public async Task<AppUserModel> AddAppUser(AppUserModel appUserModel)
        {
            AppUser appUserToAdd = mapper.Map<AppUser>(appUserModel);
            var addedAppUser = repository.AddAppUser(appUserToAdd);
            appUserModel = mapper.Map<AppUserModel>(addedAppUser);
            return appUserModel;
        }

        
    }
}
