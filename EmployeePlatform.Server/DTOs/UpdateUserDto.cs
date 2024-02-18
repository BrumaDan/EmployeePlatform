namespace EmployeePlatform.Server.DTOs
{
    public class UpdateUserDto
    {
        public string? Id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public Guid? Location { get; set; }
        public string? Role { get; set; }



    }
}
