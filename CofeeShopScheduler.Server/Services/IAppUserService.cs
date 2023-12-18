using CofeeShopScheduler.Server.Models;

namespace CofeeShopScheduler.Server.Services
{
    public interface IAppUserService
    {
        //AppUserModel GetUser(Guid id);
        //IEnumerable<AppUserModel> GetUsers();
        Task<AppUserModel> AddAppUser(AppUserModel appUserModel);
    }
}
