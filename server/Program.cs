string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        build =>
        {
            build
                .AllowAnyHeader()
                .AllowAnyOrigin()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

app.MapGet("/asd", () => "Hello Worlsdsadasdsadasdas!");

app.MapGet("/", () => "Hello Word!");

app.UseCors(MyAllowSpecificOrigins);


app.Run();
