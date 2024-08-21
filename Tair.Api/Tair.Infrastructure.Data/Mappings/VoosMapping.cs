using Tair.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Tair.Data.Mappings
{
    public class VoosMapping : IEntityTypeConfiguration<Voos>
    {
        public void Configure(EntityTypeBuilder<Voos> builder)
        {
            builder.Property(p => p.CategoriaDeVoo).IsRequired();

            builder.Property(p => p.PrecoCartaoTotal).IsRequired();
            
            builder.Property(p => p.PrecoCartaoPessoa).IsRequired();

            builder.Property(p => p.PrecoPixTotal).IsRequired();
            
            builder.Property(p => p.PrecoPixPessoa).IsRequired();

            builder.Property(p => p.QuantidadePax).IsRequired();

            builder.Property(p => p.TempoDeVooMinutos).IsRequired();

            builder.Property(p => p.TipoDeVoo).IsRequired();

            builder.Property(p => p.ImagemPequena);

            builder.Property(p => p.ImagemMedia);

            builder.Property(p => p.ImagemGrande);

            builder.Property(p => p.Titulo);

            builder.Property(p => p.Status);

            builder.Property(p => p.UrlVoo);

            builder.ToTable("Voos");
        }
    }
}
