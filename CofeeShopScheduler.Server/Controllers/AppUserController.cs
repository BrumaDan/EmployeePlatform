using CofeeShopScheduler.Server.Data.IRepository;
using CofeeShopScheduler.Server.DomainModel;
using CofeeShopScheduler.Server.Models;
using CofeeShopScheduler.Server.Services;
using CoffeeShopScheduler.Data;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace CofeeShopScheduler.Server.Controllers
{

    public class AppUserController : BaseApiController
    {
        private readonly IAppUserService service;

        public AppUserController(IAppUserService service)
        {
            this.service = service;
        }

        //[HttpGet]
        //public ActionResult<IEnumerable<AppUserModel>> GetUsers()
        //{
        //    var users = service.GetUsers();
        //    return Ok(users);
        //}

        //[HttpGet("{id}")] // /api/users/2
        //public ActionResult<AppUserModel> GetUser(Guid id)
        //{
        //    var user = service.GetUser(id);
        //    return Ok(user);
        //}
        //[HttpPost("register")] // Post:api/register
        //public async Task<ActionResult<AppUserModel>> AddUser(AppUserModel appUserModel)
        //{
        //    if (await UserExists(appUserModel.UserName)) return BadRequest("UserName is taken");
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest();
        //    }
        //    var appUserToAdd = service.AddAppUser(appUserModel);
        //    return Ok(appUserToAdd);
        //}
        //private async Task<bool> UserExists(string username)
        //{
        //    var users = service.GetUsers();
        //    return users.Any(x => x.UserName == username.ToLower());
        //}
    }
}
