using EmployeePlatform.Server.Data.IRepository;
using EmployeePlatform.Server.DomainModel;
using System.Runtime.CompilerServices;

namespace EmployeePlatform.Server.Data.Repositories
{
    public class UserLocationRepository : IUserLocationRepository
    {
        private readonly ApplicationDbContext applicationDbContext;


        public UserLocationRepository(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public AppUserLocation AssignUserToLocation(AppUserLocation newAppUserLocation)
        {
            using (var transaction = applicationDbContext.Database.BeginTransaction())
            {
                try
                {
                    var location = applicationDbContext.Locations.FirstOrDefault(x => x.Id == newAppUserLocation.LocationId);
                    var user = applicationDbContext.Users.FirstOrDefault(x => x.Id == newAppUserLocation.UserId);

                    if (location == null || user == null)
                    {
                        // Handle the case where the location or user is not found
                        // You might want to throw an exception, log the issue, or handle it based on your application's requirements.
                        throw new InvalidOperationException("Location or User not found.");
                    }

                    newAppUserLocation.Location = location;
                    newAppUserLocation.User = user;

                    var addedAssignment = applicationDbContext.AppUserLocation.Add(newAppUserLocation);
                    applicationDbContext.SaveChanges();

                    transaction.Commit();

                    return addedAssignment.Entity;
                }
                catch (Exception)
                {
                    // Handle the exception
                    transaction.Rollback();
                    throw;
                }
            }
        }

    }
}
