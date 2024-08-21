using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tair.Domain.DTOs;
using Tair.Domain.Entities.Base;

namespace Tair.Domain.Interfaces
{
    public interface IUsuarioService 
    {
        Task<List<UsuarioListDTO>> ObterListaUsuariosAsync();
        Task<UsuarioListDTO> GetUserEmailAsync(string email);
        Task<UsuarioListDTO> GetUserDocumentAsync(string document);
        Task<ApplicationUser> GetEmailById(Guid usuario_id);
        Task<UsuarioListDTO> ObterUserPeloCustomerIdAsync(string customerId);
        Task<UsuarioListDTO> ObterUserPeloDocumentoIdAsync(string document);
    }
}
