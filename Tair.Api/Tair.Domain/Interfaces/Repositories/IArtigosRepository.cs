using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tair.Domain.Entities;

namespace Tair.Domain.Interfaces
{
    public interface IArtigosRepository : IRepository<Artigos>
    {
        Task<List<Artigos>> ObterTodosArtigosSemPaginacao();
        Task<Artigos> ObterArtigoPeloId(Guid id);
        Task<Artigos> ObterArtigoPelaUrl(string url);
    }
}
