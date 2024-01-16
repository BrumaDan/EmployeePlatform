using EmployeePlatform.Server.Data.IRepository;
using EmployeePlatform.Server.DomainModel;
using System.Runtime.CompilerServices;

namespace EmployeePlatform.Server.Data.Repositories
{
    public class UserLocationRepository : IUserLocationRepository
    {
        private readonly ApplicationDbContext applicationDbContext;


        public UserLocationRepository(ApplicationDbContext context)
        {
            applicationDbContext = context;
        }
        public AppUserLocation AssignUserToLocation(AppUserLocation newUserLocationAssisgnment)
        {

            var addedAssignment = applicationDbContext.Add(newUserLocationAssisgnment);
            applicationDbContext.SaveChanges();
            return addedAssignment.Entity;
        }
    }
}
