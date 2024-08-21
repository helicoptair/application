namespace Tair.Api.ViewModels
{
    public class ChargeWebhookViewModel
    {
        public ChargeDataWebhookViewModel Data { get; set; }
    }
    public class ChargeDataWebhookViewModel
    {
        public ChargeObjectWebhookViewModel Object { get; set; }
    }

    public class ChargeObjectWebhookViewModel
    {
        public string Id { get; set; }
        public string balance_transaction { get; set; }
        public bool paid { get; set; }
        public ChargeMetadataWebhookViewModel metadata { get; set; }
        public ChargeOutcomeWebhookViewModel outcome { get; set; }
    }

    public class ChargeMetadataWebhookViewModel
    {
        public string Identificador_DB { get; set; }
    }

    public class ChargeOutcomeWebhookViewModel
    {
        public string seller_message { get; set; }
    }
}
