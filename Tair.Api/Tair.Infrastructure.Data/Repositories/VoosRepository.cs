using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tair.Data.Context;
using Tair.Data.Repositories;
using Tair.Domain.Entities;
using Tair.Domain.Interfaces;

namespace Tair.Data.Repository
{
    public class VoosRepository : Repository<Voos>, IVoosRepository
    {
        public VoosRepository(TairDbContext context) : base(context) { }

        public async Task<List<Voos>> ObterTodosVoosSemPaginacao() {
            return await Db.Voos.AsNoTracking().ToListAsync();
        }

        public async Task<Voos> ObterVooPeloId(Guid id)
        {
            return await Db.Voos
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Voos> ObterVooPelaUrl(string url)
        {
            return await Db.Voos
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.UrlVoo == url);
        }

    }
}
