using System.Reflection;
using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
namespace Infrastructure.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
  public DbSet<Test> Tests => Set<Test>();

  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
  {}

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
      modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
  }

  public async Task MigrateAsync(CancellationToken cancellationToken = default)
      => await Database.MigrateAsync(cancellationToken);
}
