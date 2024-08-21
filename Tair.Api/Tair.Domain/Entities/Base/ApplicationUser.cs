using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Tair.Domain.Entities.Base
{
    public class ApplicationUser : IdentityUser
    {
        // Obrigatório --> 64 caracteres
        [JsonPropertyName("name")]
        public string Name { get; set; }

        // Obrigatório --> 64 caracteres
        [JsonPropertyName("email")]
        [MaxLength(64)]
        public override string Email { get => base.Email; set => base.Email = value; }

        // Opcional --> deixar em branco
        [JsonPropertyName("code")]
        public string Code { get; set; }

        // Obrigatório --> 10 caracteres
        [JsonPropertyName("type")]
        [MaxLength(10)]
        public string Type { get; set; }

        [JsonPropertyName("country")]
        public string Country { get; set; }

        [JsonPropertyName("state")]
        public string State { get; set; }

        [JsonPropertyName("city")]
        public string City { get; set; }

        [JsonPropertyName("zipcode")]
        public string Zipcode { get; set; }

        [JsonPropertyName("line1")]
        public string Line1 { get; set; }

        [JsonPropertyName("line2")]
        public string Line2 { get; set; }

        // Obrigatório --> 14 caracteres
        [JsonPropertyName("document")]
        [MaxLength(14)]
        public string Document { get; set; }

        // Opcional
        [JsonPropertyName("customer_stripe_id")]
        public string Customer_Stripe_Id { get; set; }

        // Opcional
        [JsonPropertyName("foto")]
        public string Foto { get; set; }
    }
}
