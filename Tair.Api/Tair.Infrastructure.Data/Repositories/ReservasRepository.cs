using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tair.Data.Context;
using Tair.Data.Repositories;
using Tair.Domain.Entities;
using Tair.Domain.Interfaces;

namespace Tair.Data.Repository
{
    public class ReservasRepository : Repository<Reservas>, IReservasRepository
    {
        public ReservasRepository(TairDbContext context) : base(context) { }

        public async Task<List<Reservas>> ObterTodasReservasSemPaginacao() {
            return await Db.Reservas.AsNoTracking().ToListAsync();
        }

        public async Task<Reservas> ObterReservaPeloId(Guid id)
        {
            return await Db.Reservas
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Reservas> ObterReservaPeloIdentificadord(string identificador)
        {
            return await Db.Reservas
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Identificador == identificador);
        }

        public async Task<List<Reservas>> ObterReservasDoUsuario(Guid usuarioId)
        {
            return await Db.Reservas
                .AsNoTracking()
                .Where(c => c.UsuarioId == usuarioId)
                .OrderBy(c => c.DataVoo)
                .ToListAsync();
        }

    }
}
