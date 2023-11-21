using CoffeeShopScheduler.Models;

namespace CoffeeShopScheduler.DomainModel
{
    public class Employee : BaseDomainModel
    {
        public bool Status { get; set; }
        public string ContractType { get; set; }
        public int HourBank { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid LocationId { get; set; }
        public virtual Location Location { get; set; }
    }
}
