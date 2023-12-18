using CofeeShopScheduler.Server.DomainModel;

namespace CofeeShopScheduler.Server.Interfaces
{
    public interface ITokenService
    {
        public string CreateToken(AppUser user);
    }
}
