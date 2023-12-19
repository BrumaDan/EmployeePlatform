using AutoMapper;
using EmployeePlatform.Server.Data.IRepository;
using EmployeePlatform.Server.DomainModel;
using EmployeePlatform.Server.Models;

namespace EmployeePlatform.Server.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository locationRepository;
        private readonly IMapper mapper;

        public LocationService(ILocationRepository locationRepository, IMapper mapper)
        {
            this.locationRepository = locationRepository;
            this.mapper = mapper;
        }

        public LocationModel AddLocation(LocationModel newLocation)
        {
            //-.Product model - > Product

            Location locationToAdd = mapper.Map<Location>(newLocation);
            var addedLocation = locationRepository.AddLocation(locationToAdd);
            newLocation = mapper.Map<LocationModel>(addedLocation);
            return newLocation;
        }
        public IEnumerable<LocationModel> GetAllLocations()
        {
            var allLocations = locationRepository.GetLocations().ToList();
            var locationModels = mapper.Map<IEnumerable<LocationModel>>(allLocations);
            return locationModels;
        }

    }
}
