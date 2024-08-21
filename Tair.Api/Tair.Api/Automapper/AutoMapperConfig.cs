using AutoMapper;
using Tair.Api.ViewModels;
using Tair.Domain.Entities;
using Tair.Domain.Entities.Base;

namespace Tair.Api.AutoMapper
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<ApplicationUser, ApplicationUserViewModel>().ReverseMap();
            CreateMap<Voos, VoosListViewModel>().ReverseMap();
            CreateMap<Voos, VoosEditViewModel>().ReverseMap();
            CreateMap<Reservas, ReservasEditViewModel>().ReverseMap();
            CreateMap<Reservas, ReservasListViewModel>().ReverseMap();
            CreateMap<Artigos, ArtigosListViewModel>().ReverseMap();
        }
    }
}
