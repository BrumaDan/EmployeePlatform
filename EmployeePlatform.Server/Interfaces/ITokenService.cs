using EmployeePlatform.Server.DomainModel;

namespace EmployeePlatform.Server.Interfaces
{
    public interface ITokenService
    {
        public string CreateToken(AppUser user);
    }
}
