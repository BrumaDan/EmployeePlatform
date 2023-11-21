using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using CoffeeShopScheduler.Models;
using CoffeeShopScheduler.Services;

namespace CoffeeShopScheduler.Controllers
{
    [ApiController]    
    [Route("api/[controller]")]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService locationService;

        public LocationController(ILocationService locationService)
        {
            this.locationService = locationService;
        }
        [HttpGet]
        [EnableCors]
        public ActionResult<IEnumerable<LocationModel>> Get()
        {
            var locationList = locationService.GetAllLocations();
            return Ok(locationList);
        }
        // POST api/<CustomersController>
        [HttpPost]
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

       
    }
}
