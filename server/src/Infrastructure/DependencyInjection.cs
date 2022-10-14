using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Common.Interfaces;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {        
        services.AddDbContext<ApplicationDbContext>(options => 
            options.UseSqlServer(
                configuration.GetConnectionString("Database"), 
                opt => opt.MigrationsAssembly(typeof(DependencyInjection).Namespace)));
        services.AddScoped<IApplicationDbContext, ApplicationDbContext>();

        return services;
    }
}
