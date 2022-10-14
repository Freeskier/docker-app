using Application.Common.Interfaces;
using Domain.Entities;

namespace Infrastructure.Persistence;
public static class DataSeedInitializer
{
    public static async Task InitializeSeed(this IApplicationDbContext context, CancellationToken cancellationToken = default)
    {
        if(context.Tests.Any())
        {
            return;
        }
        
        context.Tests.AddRange(new List<Test>(){
            new Test { Id = Guid.NewGuid(), Name = "Jeden" },
            new Test { Id = Guid.NewGuid(), Name = "Dwa" }
        });

        await context.SaveChangesAsync(cancellationToken);
    }
}
