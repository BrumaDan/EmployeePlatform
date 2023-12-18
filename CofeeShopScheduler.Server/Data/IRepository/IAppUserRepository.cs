using CofeeShopScheduler.Server.DomainModel;
using CofeeShopScheduler.Server.Models;

namespace CofeeShopScheduler.Server.Data.IRepository
{
    public interface IAppUserRepository
    {
      //IEnumerable<AppUser> GetUsers();
      //  AppUser GetUser(Guid id);

       Task<AppUser> AddAppUser(AppUser appUser);
    }
}
