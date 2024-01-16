using AutoMapper;
using EmployeePlatform.Server.Data.IRepository;
using EmployeePlatform.Server.Data.Repositories;
using EmployeePlatform.Server.DomainModel;
using EmployeePlatform.Server.Models;

namespace EmployeePlatform.Server.Services
{
    public class UserLocationService : IUserLocationService
    {
        private readonly IUserLocationRepository userLocationRepository;
        private readonly IMapper mapper;

        public UserLocationService(IUserLocationRepository userLocationRepository, IMapper mapper)
        {
            this.userLocationRepository = userLocationRepository;
            this.mapper = mapper;
        }

        public UserLocationModel AssignUserToLocation(UserLocationModel newLocationAssignment)
        {
            AppUserLocation locationToAdd = mapper.Map<AppUserLocation>(newLocationAssignment);
            var assignedLocation = userLocationRepository.AssignUserToLocation(locationToAdd);
            newLocationAssignment = mapper.Map<UserLocationModel>(assignedLocation);
            return newLocationAssignment;
        }
    }
}
