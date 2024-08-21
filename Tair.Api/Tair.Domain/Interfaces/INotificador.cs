using Tair.Domain.Notificacoes;
using System.Collections.Generic;

namespace Tair.Domain.Interfaces
{
    public interface INotificador
    {
        bool TemNotificacao();
        List<Notificacao> ObterNotificacoes();
        void Handle(Notificacao notificacao);
    }
}
