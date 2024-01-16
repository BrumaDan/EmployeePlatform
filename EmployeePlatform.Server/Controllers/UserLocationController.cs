using AutoMapper;
using EmployeePlatform.Server.DomainModel;
using EmployeePlatform.Server.Interfaces;
using EmployeePlatform.Server.Models;
using EmployeePlatform.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EmployeePlatform.Server.Controllers
{
    public class UserLocationController : BaseApiController
    {

        private readonly IUserLocationService userLocationService;


        public UserLocationController(IUserLocationService userLocationService)
        {     
            this.userLocationService = userLocationService;
        }

        [HttpPost("assignLocation")]
        //[Authorize(Policy = "RequireAdminRole")]
        [Authorize]
        [EnableCors]
        public IActionResult Post([FromBody] UserLocationModel newLocationAssignment)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var assignedLocation = userLocationService.AssignUserToLocation(newLocationAssignment);

            return CreatedAtAction("Get", new { id = assignedLocation.Id }, assignedLocation);
        }
    }
}
