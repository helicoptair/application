using Tair.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Tair.Data.Mappings
{
    public class ReservasMapping : IEntityTypeConfiguration<Reservas>
    {
        public void Configure(EntityTypeBuilder<Reservas> builder)
        {
            builder.Property(p => p.DataVoo).IsRequired();
            builder.Property(p => p.VooId).IsRequired();
            builder.Property(p => p.UsuarioId).IsRequired();

            // RELATIONSHIP
            builder.HasOne(x => x.Voo)
                .WithMany(x => x.Reservas)
                .HasForeignKey(x => x.VooId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.ToTable("Reservas");
        }
    }
}
