using Application.Common.Interfaces;
using Infrastructure.Persistence;

namespace API.Extensions;
public static class WebApplicationExtensions
{
    public static async Task ApplyMigrations(this WebApplication app, CancellationToken cancellationToken = default)
    {
        using var scope = app.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<IApplicationDbContext>();
        
        try {
            await db.MigrateAsync(cancellationToken);
        }
        catch (Exception) {

        }
    } 

    public static async Task ApplySeed(
        this WebApplication app, 
        CancellationToken cancellationToken = default)
    {
        if(app.Environment.IsDevelopment()) 
        {
            using var scope = app.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<IApplicationDbContext>();
            
            try {
                await db.InitializeSeed();
            }
            
            catch (Exception) {

            }
        }
    } 
}
