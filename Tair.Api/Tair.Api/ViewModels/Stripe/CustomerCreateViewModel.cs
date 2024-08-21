namespace Tair.Api.ViewModels
{
    public class CustomerCreateViewModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public Address Address { get; set; }
    }

    public class Address
    {
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Line2 { get; set; }
        public string Line1 { get; set; }
        public string Country { get; set; }
    }
}
