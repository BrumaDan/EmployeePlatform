using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

public class MyClaimsTransformation : IClaimsTransformation
{
    public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
    {
        ClaimsIdentity claimsIdentity = new ClaimsIdentity();
        var username = "UserName";       
        if (!principal.HasClaim(claim => claim.Type == username))
        {
            claimsIdentity.AddClaim(new Claim(username, "UserName"));
        }

        principal.AddIdentity(claimsIdentity);
        return Task.FromResult(principal);
    }
}