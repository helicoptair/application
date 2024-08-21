using Tair.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Tair.Data.Mappings
{
    public class ArtigosMapping : IEntityTypeConfiguration<Artigos>
    {
        public void Configure(EntityTypeBuilder<Artigos> builder)
        {
            builder.Property(p => p.EscritoPor).IsRequired();
            builder.Property(p => p.FotoCapa).IsRequired();
            builder.Property(p => p.Html).IsRequired().HasMaxLength(8000);
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Resumo).IsRequired().HasMaxLength(2000);
            builder.Property(p => p.Titulo).IsRequired();
            builder.Property(p => p.UrlArtigo).IsRequired();

            builder.ToTable("Artigos");
        }
    }
}
