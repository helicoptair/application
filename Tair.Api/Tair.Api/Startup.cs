using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Stripe;
using Tair.Api.Configuration;
using Tair.Api.Configurations;
using Tair.Data.Context;

namespace Tair.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<TairDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddIdentityConfiguration(Configuration);
            services.AddAutoMapper(typeof(Startup));
            services.WebApiConfig();
            services.AddSwaggerConfig();
            services.AddLoggingConfig(Configuration);
            services.ResolveDependencies();
            services.AddSignalR();
        }

        //public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IApiVersionDescriptionProvider provider, IBackgroundJobClient backgroundJobs)
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IApiVersionDescriptionProvider provider)
        {
            var userPagarme = Configuration["Stripe:Key"];
            StripeConfiguration.ApiKey = userPagarme;
            
            app.UseApiConfig(env);
            app.UseSwaggerConfig(provider);
        }
    }
}
