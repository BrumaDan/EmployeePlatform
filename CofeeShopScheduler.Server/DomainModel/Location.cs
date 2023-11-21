﻿namespace CoffeeShopScheduler.DomainModel
{
    public partial class Location : BaseDomainModel
    {
        public Location()
        {
            Employees = new List<Employee>();
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public int StreetNumber { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
    }
}
