using System;
using System.Text.Json.Serialization;
using Tair.Domain.Entities.Base;

namespace Tair.Domain.Entities
{
    public class Reservas : BaseEntity
    {
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

        [JsonPropertyName("error_message")]
        public string ErrorMessage { get; set; }

        [JsonPropertyName("usuario_id")]
        public Guid UsuarioId { get; set; }

        //RELATIONSHIPS

        [JsonPropertyName("voo_id")]
        public Guid VooId { get; set; }

        public Voos Voo { get; set; }
    }
}
