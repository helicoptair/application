using System.Threading.Tasks;

namespace Tair.Domain.Entities.Base
{
    public interface ISignalR
    {
        Task PixIsPaid(bool isPaid);
    }
}
