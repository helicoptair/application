using Tair.Domain.Entities.Base;
using Tair.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Tair.Api.Data
{
    public class IdentityRepository : IIdentityRepository
    {
        private ApplicationDbContext context;
        private DbSet<ApplicationUser> _db;

        public IdentityRepository(ApplicationDbContext context)
        {
            this.context = context;
            _db = context.Set<ApplicationUser>();
        }

        public string GetCodigoPagarme(string id)
        {
            ApplicationUser usuario =  _db.SingleOrDefault(s => s.Id == id);
            return usuario.Customer_Stripe_Id;
        }
    }
}