using CofeeShopScheduler.Server.Data.IRepository;
using CofeeShopScheduler.Server.DomainModel;
using CofeeShopScheduler.Server.Models;
using CoffeeShopScheduler.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace CofeeShopScheduler.Server.Data.Repositories
{
    public class AppUserRepository : IAppUserRepository
    {
        private readonly ApplicationDbContext context;

        public AppUserRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        //public AppUser GetUser(Guid id)
        //{
        //    var user = context.AppUsers.Find(id);
        //    return user;
        //}

        //public IEnumerable<AppUser> GetUsers()
        //{
        //    var users = context.AppUsers.ToList();
        //    return users;
        //}
        public async Task<AppUser> AddAppUser(AppUser appUserModel)
        {

            return null;
        }

    }
}
