namespace EmployeePlatform.Server.DomainModel
{
    public class Location : BaseDomainModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int StreetNumber { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public virtual ICollection<AppUserLocation> UserLocations { get; set; }
      
    }
}
