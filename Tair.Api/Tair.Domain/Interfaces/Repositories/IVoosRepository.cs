using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tair.Domain.Entities;

namespace Tair.Domain.Interfaces
{
    public interface IVoosRepository : IRepository<Voos>
    {
        Task<List<Voos>> ObterTodosVoosSemPaginacao();
        Task<Voos> ObterVooPeloId(Guid id);

        Task<Voos> ObterVooPelaUrl(string url);
    }
}
