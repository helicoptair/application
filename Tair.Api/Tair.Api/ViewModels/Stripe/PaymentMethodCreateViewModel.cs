namespace Tair.Api.ViewModels
{
    public class PaymentMethodCreateViewModel
    {
        public CardViewModel card { get; set; }
    }

    public class CardViewModel
    {
        public string number { get; set; }
        public string brand { get; set; }
        public int ExpMonth { get; set; }
        public int ExpYear { get; set; }
        public string Cvc { get; set; }
    }
}