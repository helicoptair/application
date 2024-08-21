using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tair.Domain.Entities;

namespace Tair.Domain.Interfaces
{
    public interface IReservasRepository : IRepository<Reservas>
    {
        Task<List<Reservas>> ObterTodasReservasSemPaginacao();
        Task<Reservas> ObterReservaPeloId(Guid id);
        Task<Reservas> ObterReservaPeloIdentificadord(string identificador);
        Task<List<Reservas>> ObterReservasDoUsuario(Guid usuarioId);
    }
}
