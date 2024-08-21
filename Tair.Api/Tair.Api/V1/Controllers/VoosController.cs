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
using Tair.Domain.Interfaces;

namespace Tair.Api.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/voos")]
    public class VoosController : MainController
    {
        #region VARIABLES
        private readonly IVoosRepository _voosRepository;
        private readonly IVoosService _voosService;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUser _user;
        #endregion

        #region CONSTRUCTOR
        public VoosController(IVoosRepository voosRepository,
                              IVoosService voosService,
                              IMapper mapper,
                              IConfiguration configuration,
                              UserManager<ApplicationUser> userManager,
                              INotificador notificador, IUser user) : base(notificador, user, configuration)
        {
            _voosRepository = voosRepository;
            _mapper = mapper;
            _voosService = voosService;
            _userManager = userManager;
            _user = user;
        }
        #endregion

        #region CRUD
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Adicionar(VoosEditViewModel voosEditViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var vooToAdd = _mapper.Map<Voos>(voosEditViewModel);

            var result = await _voosService.Adicionar(vooToAdd);

            return CustomResponse(result);
        }
        #endregion

        #region Methods
        [AllowAnonymous]
        [HttpGet("obter-voos-sem-paginacao")]
        public async Task<ActionResult<List<VoosListViewModel>>> ObterVoosSemPaginacao()
        {
            var result = await _voosRepository.ObterTodosVoosSemPaginacao();

            var resultMapeado = _mapper.Map<List<VoosListViewModel>>(result);

            return CustomResponse(resultMapeado);
        }

        [HttpGet("{id:guid}")]
        [AllowAnonymous]
        public async Task<ActionResult<VoosListViewModel>> ObterVooPeloId(Guid id)
        {
            var result = await _voosRepository.ObterVooPeloId(id);

            var voo = _mapper.Map<VoosListViewModel>(result);

            if (voo == null) return NotFound();

            return voo;
        }

        [HttpGet("{url_voo}")]
        [AllowAnonymous]
        public async Task<ActionResult<VoosListViewModel>> ObterVooPelaUrl(string url_voo)
        {
            var result = await _voosRepository.ObterVooPelaUrl(url_voo);

            var voo = _mapper.Map<VoosListViewModel>(result);

            if (voo == null) return NotFound();

            return voo;
        }
        #endregion
    }
}