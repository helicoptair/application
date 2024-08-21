using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tair.Api.Controllers;
using Tair.Api.ViewModels;
using Tair.Domain.Interfaces;

namespace Tair.Api.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/artigos")]
    public class ArtigosController : MainController
    {
        #region VARIABLES
        private readonly IArtigosRepository _artigosRepository;
        private readonly IUser _user;
        private readonly IMapper _mapper;
        #endregion

        #region CONSTRUCTOR
        public ArtigosController(IArtigosRepository artigosRepository,
                              IConfiguration configuration,
                              IMapper mapper,
                              INotificador notificador, IUser user) : base(notificador, user, configuration)
        {
            _artigosRepository = artigosRepository;
            _user = user;
            _mapper = mapper;
        }
        #endregion

        #region CRUD
        #endregion

        #region Methos
        [AllowAnonymous]
        [HttpGet("obter-artigos-sem-paginacao")]
        public async Task<ActionResult<List<ArtigosListViewModel>>> ObterArtigosSemPaginacao()
        {
            var result = await _artigosRepository.ObterTodosArtigosSemPaginacao();

            var resultMapeado = _mapper.Map<List<ArtigosListViewModel>>(result);

            return CustomResponse(resultMapeado);
        }

        [HttpGet("{id:guid}")]
        [AllowAnonymous]
        public async Task<ActionResult<ArtigosListViewModel>> ObterArtigoPeloId(Guid id)
        {
            var result = await _artigosRepository.ObterArtigoPeloId(id);

            var artigo = _mapper.Map<ArtigosListViewModel>(result);

            if (artigo == null) return NotFound();

            return artigo;
        }

        [HttpGet("{url_artigo}")]
        [AllowAnonymous]
        public async Task<ActionResult<ArtigosListViewModel>> ObterArtigoPelaUrl(string url_artigo)
        {
            var result = await _artigosRepository.ObterArtigoPelaUrl(url_artigo);

            var artigo = _mapper.Map<ArtigosListViewModel>(result);

            if (artigo == null) return NotFound();

            return artigo;
        }
        #endregion
    }
}