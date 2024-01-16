using EmployeePlatform.Server.Models;
using EmployeePlatform.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace EmployeePlatform.Server.Controllers
{
    public class LocationController : BaseApiController
    {
        private readonly ILocationService locationService;

        public LocationController(ILocationService locationService)
        {
            this.locationService = locationService;
        }


        [HttpGet]
        [Authorize]
        [EnableCors]
        public IActionResult Get()
        {
            var locationList = locationService.GetAllLocations();
            return Ok(locationList);
        }



        // POST api/<CustomersController>
        [HttpPost]
        //[Authorize(Policy = "RequireAdminRole")]
        [Authorize]
        [EnableCors]
        public IActionResult Post([FromBody] LocationModel newLocation)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var addedLocation = locationService.AddLocation(newLocation);

            return CreatedAtAction("Get", new { id = addedLocation.Id }, addedLocation);
        }

        [HttpPut("{id}")]
        [Authorize]
        [EnableCors]
        public IActionResult UpdateLocation(Guid id, [FromBody] LocationModel locationToUpdate)
        {
            if (id != locationToUpdate.Id)
            {
                return BadRequest();
            }
            if (!locationService.Exists(id))
            {
                return NotFound();
            }
            locationService.UpdateLocation(locationToUpdate);
            return NoContent();
        }
        [HttpDelete("{id}")]
        [Authorize]
        [EnableCors]
        public IActionResult DeleteLocation(Guid id)
        {
            if (!locationService.Exists(id))
            {
                return NotFound();
            }
            var isDelted = locationService.DeleteLocation(id);
            return NoContent();
        }

    }
}
  