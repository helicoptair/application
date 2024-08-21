using System;
using System.Threading.Tasks;
using Tair.Domain.Entities;
using Tair.Domain.Interfaces;

namespace Tair.Domain.Services
{
    public class VoosService : BaseService, IVoosService
    {
        private readonly IVoosRepository _voosRepository;

        public VoosService(IVoosRepository voosRepository,
                               INotificador notificador) : base(notificador)
        {
            _voosRepository = voosRepository;
        }

        public async Task<bool> Adicionar(Voos voos)
        {
            await _voosRepository.Insert(voos);
            return true;
        }

        public async Task<bool> Atualizar(Voos voos)
        {

            await _voosRepository.Update(voos);

            return true;
        }

        public async Task<bool> Remover(Guid id)
        {
            await _voosRepository.Delete(id);
            return true;
        }

        public void Dispose()
        {
            _voosRepository?.Dispose();
        }
    }
}
