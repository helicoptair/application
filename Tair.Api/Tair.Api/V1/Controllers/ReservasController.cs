using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tair.Api.Controllers;
using Tair.Api.ViewModels;
using Tair.Domain.Entities;
using Tair.Domain.Entities.Base;
using Tair.Domain.Enums;
using Tair.Domain.Interfaces;

namespace Tair.Api.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/reservas")]
    public class ReservasController : MainController
    {
        #region VARIABLES
        private readonly IReservasRepository _reservasRepository;
        private readonly IVoosRepository _voosRepository;
        private readonly IReservasService _reservasService;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUser _user;
        #endregion

        #region CONSTRUCTOR
        public ReservasController(IReservasRepository reservasRepository,
                                  IReservasService reservasService,
                                  IVoosRepository voosRepository,
                                  IMapper mapper,
                                  IConfiguration configuration,
                                  UserManager<ApplicationUser> userManager,
                                  INotificador notificador, IUser user) : base(notificador, user, configuration)
        {
            _voosRepository = voosRepository;
            _reservasRepository = reservasRepository;
            _mapper = mapper;
            _reservasService = reservasService;
            _userManager = userManager;
            _user = user;
        }
        #endregion

        #region CRUD
        #endregion

        #region Methods
        [Authorize]
        [HttpGet("obter-minhas-reservas")]
        public async Task<ActionResult<List<ReservasListViewModel>>> ObterMinhasReservas()
        {
            var userLogado = await _userManager.FindByIdAsync(_user.GetUserId().ToString());

            var result = await _reservasRepository.ObterReservasDoUsuario(new Guid(userLogado.Id));
            var resultMapeado = new List<ReservasListViewModel>();

            foreach (var reserva in result)
            {
                var voo = await _voosRepository.GetByIdAsync(reserva.VooId);
                bool podeCancelar;

                var dataAtual = DateTime.UtcNow;
                TimeSpan ts = reserva.DataVoo - dataAtual;
                if (ts.TotalDays > 1 && reserva.ChargeStatus == "Charge Succeeded")
                {
                    podeCancelar = true;
                }
                else
                {
                    podeCancelar = false;
                }

                resultMapeado.Add(new ReservasListViewModel() { 
                    Id = reserva.Id,
                    ChargeStatus = reserva.ChargeStatus,
                    TempoDeVoo = voo.TempoDeVooMinutos,
                    DataVoo = reserva.DataVoo,
                    FormaPagamento = "Cartão", // IMPLEMENTAR
                    CategoriaVoo = voo.CategoriaDeVoo.ToString(),
                    QuantidadePax = voo.QuantidadePax,
                    ValorPago = 300,
                    PodeCancelarOuRemarcar = podeCancelar
                });
            }


            return CustomResponse(resultMapeado);
        }
        #endregion
    }
}