using System;
using System.Text.Json.Serialization;
using Tair.Domain.Enums;

namespace Tair.Api.ViewModels
{
    public class ReservasListViewModel
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        [JsonPropertyName("data_voo")]
        public DateTime DataVoo { get; set; }

        [JsonPropertyName("charge_status")]
        public string ChargeStatus { get; set; }

        [JsonPropertyName("valor_pago")]
        public int ValorPago { get; set; }

        [JsonPropertyName("forma_pagamento")]
        public string FormaPagamento { get; set; }

        [JsonPropertyName("pode_cancelar_ou_remarcar")]
        public bool PodeCancelarOuRemarcar { get; set; }

        [JsonPropertyName("quantidade_pax")]
        public int QuantidadePax { get; set; }

        [JsonPropertyName("categoria_voo")]
        public string CategoriaVoo { get; set; }

        [JsonPropertyName("tempo_de_voo")]
        public int TempoDeVoo { get; set; }
    }
}
