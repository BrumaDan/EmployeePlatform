using EmployeePlatform.Server.DomainModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EmployeePlatform.Server.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager , RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var users = new List<AppUser>() {
                
                   
            };
            var roles = new List<AppRole> {
                new AppRole { Name = "Employee" },
                new AppRole { Name = "Administrator" }
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }          
            var employee = new AppUser { FirstName = "Test", LastName = "Employee", UserName = "teste" };
            var admin = new AppUser { FirstName = "Dan", LastName = "Bruma", UserName = "danb" };
            await userManager.CreateAsync(employee,"String123");
            await userManager.CreateAsync(admin, "String123");
            await userManager.AddToRoleAsync(employee, "Employee");
            await userManager.AddToRoleAsync(admin, "Administrator");


        }
    }
}
