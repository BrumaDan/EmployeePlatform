using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeePlatform.Server.Controllers
{
    public class AdminController : BaseApiController
    {
        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users-with-roles")]
        public ActionResult GetUsersWithRole() 
        {
            return Ok("only Admins can see this");
        }
        [Authorize(Policy = "RequireEmployeeRole")]
        [HttpGet("employees")]
        public ActionResult GetUsers()
        {
            return Ok("only Employees can see this");
        }
    }
}
