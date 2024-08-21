using System;
using System.Text.Json.Serialization;
using Tair.Domain.Enums;

namespace Tair.Api.ViewModels
{
    public class VoosEditViewModel
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        [JsonPropertyName("tempo_de_voo_minutos")]
        public int TempoDeVooMinutos { get; set; }

        [JsonPropertyName("quantidade_pax")]
        public int QuantidadePax { get; set; }

        [JsonPropertyName("tipo_de_voo")]
        public TipoVooEnum TipoDeVoo { get; set; }

        [JsonPropertyName("categoria_de_voo")]
        public CategoriaVooEnum CategoriaDeVoo { get; set; }

        [JsonPropertyName("preco_pix_total")]
        public decimal PrecoPixTotal { get; set; }

        [JsonPropertyName("preco_cartao_total")]
        public decimal PrecoCartaoTotal { get; set; }

        [JsonPropertyName("preco_pix_pessoa")]
        public decimal PrecoPixPessoa { get; set; }

        [JsonPropertyName("preco_cartao_pessoa")]
        public decimal PrecoCartaoPessoa { get; set; }

        [JsonPropertyName("titulo")]
        public string Titulo { get; set; }

        [JsonPropertyName("status")]
        public string Status { get; set; }
    }
}
