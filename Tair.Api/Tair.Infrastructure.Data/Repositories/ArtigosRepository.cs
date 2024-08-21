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
    public class ArtigosRepository : Repository<Artigos>, IArtigosRepository
    {
        public ArtigosRepository(TairDbContext context) : base(context) { }

        public async Task<List<Artigos>> ObterTodosArtigosSemPaginacao() {
            return await Db.Artigos.AsNoTracking().ToListAsync();
        }

        public async Task<Artigos> ObterArtigoPeloId(Guid id)
        {
            return await Db.Artigos
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Artigos> ObterArtigoPelaUrl(string url)
        {
            return await Db.Artigos
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.UrlArtigo == url);
        }

    }
}
