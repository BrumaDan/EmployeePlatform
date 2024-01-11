using EmployeePlatform.Server.DomainModel;

namespace EmployeePlatform.Server.Interfaces
{
    public interface ITokenService
    {
        public Task<string> CreateToken(AppUser user);
    }
}
