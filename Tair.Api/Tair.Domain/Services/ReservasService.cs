using System;
using System.Threading.Tasks;
using Tair.Domain.Entities;
using Tair.Domain.Interfaces;

namespace Tair.Domain.Services
{
    public class ReservasService : BaseService, IReservasService
    {
        private readonly IReservasRepository _reservasRepository;

        public ReservasService(IReservasRepository reservasRepository,
                               INotificador notificador) : base(notificador)
        {
            _reservasRepository = reservasRepository;
        }

        public async Task<bool> Adicionar(Reservas reservas)
        {
            await _reservasRepository.Insert(reservas);
            return true;
        }

        public async Task<bool> Atualizar(Reservas reservas)
        {

            await _reservasRepository.Update(reservas);

            return true;
        }

        public async Task<bool> Remover(Guid id)
        {
            await _reservasRepository.Delete(id);
            return true;
        }

        public void Dispose()
        {
            _reservasRepository?.Dispose();
        }
    }
}
