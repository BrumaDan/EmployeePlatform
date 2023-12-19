namespace EmployeePlatform.Server.Models
{
    public class LocationModel : BaseModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int StreetNumber { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
    }
}
