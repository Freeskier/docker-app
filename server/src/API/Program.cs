using API.Extensions;
using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

 builder.Services.AddEndpointsApiExplorer();
 builder.Services.AddSwaggerGen();

var corsPolicy = "myCORSpolicy";
builder.Services.AddCors(
    opt => opt.AddPolicy(corsPolicy, builder =>
        builder.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin())
);

var app = builder.Build();

if(app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

await app.ApplyMigrations();
await app.ApplySeed();

app.UseCors(corsPolicy);

app.MapGet("/", () => "Hello World!");

app.MapPost("/add", async ([FromBody] Test test, IApplicationDbContext context) => {
    context.Tests.Add(test);
    await context.SaveChangesAsync();
});

app.MapGet("/all", (IApplicationDbContext context) => context.Tests.ToList());

app.Run();
