using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.SwaggerGen;
using Tair.Api.Configuration;
using Tair.Api.Data;
using Tair.Api.Extensions;
using Tair.Data.Context;
using Tair.Data.Repository;
using Tair.Domain.Entities.Base;
using Tair.Domain.Interfaces;
using Tair.Domain.Notificacoes;
using Tair.Domain.Services;

namespace Tair.Api.Configurations
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<TairDbContext>();

            // SERVICES
            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<IVoosService, VoosService>();
            services.AddScoped<IReservasService, ReservasService>();
            services.AddScoped<IUsuarioService, UsuarioService>();

            // REPOSITORIES
            services.AddScoped<IArtigosRepository, ArtigosRepository>();
            services.AddScoped<IReservasRepository, ReservasRepository>();
            services.AddScoped<IVoosRepository, VoosRepository>();
            services.AddScoped<IIdentityRepository, IdentityRepository>();
            
            services.AddScoped<ISignalR, SignalRHub>(); // SIGNAL R
            services.AddScoped<INotificador, Notificador>();
            services.AddScoped<IUser, AspNetUser>();
            services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();

            return services;
        }
    }
}
