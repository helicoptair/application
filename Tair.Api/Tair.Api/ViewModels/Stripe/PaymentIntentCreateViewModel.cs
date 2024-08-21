namespace Tair.Api.ViewModels
{
    public class PaymentIntentCreateViewModel
    {
        public long Amount { get; set; }
        public string Currency { get; set; }
        public AutomaticPaymentMethods AutomaticPaymentMethods { get; set; }
    }

    public class AutomaticPaymentMethods
    {
        public bool Enabled { get; set; }
    }
}
