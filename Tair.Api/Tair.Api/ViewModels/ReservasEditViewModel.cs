using System;
using System.Text.Json.Serialization;

namespace Tair.Api.ViewModels
{
    public class ReservasEditViewModel
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        [JsonPropertyName("data_do_voo")]
        public DateTime DataVoo { get; set; }

        [JsonPropertyName("charge_id")]
        public string ChargeId { get; set; }

        [JsonPropertyName("charge_status")]
        public string ChargeStatus { get; set; }

        [JsonPropertyName("transaction_id")]
        public string TransactionId { get; set; }

        [JsonPropertyName("identificador")]
        public string Identificador { get; set; }

        [JsonPropertyName("usuario_id")]
        public Guid UsuarioId { get; set; }

        //RELATIONSHIPS
        [JsonPropertyName("voo_id")]
        public Guid VooId { get; set; }
    }
}
