namespace EmployeePlatform.Server.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public IList<string> Role { get; set; }
    }
}
