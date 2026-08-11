using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using StarWars.Application.Abstractions;
using StarWars.Application.Caching;
using StarWars.Application.Infrastructure;
using StarWars.Application.Services;

var builder = WebApplication.CreateBuilder(args);

const string CorsPolicyName = "AllowClient";

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddProblemDetails();

builder.Services.AddMemoryCache();
builder.Services.Configure<SwapiCacheOptions>(builder.Configuration.GetSection(SwapiCacheOptions.SectionName));

builder.Services.AddHttpClient<HttpSwapiClient>(client =>
{
    var baseUrl = builder.Configuration["Swapi:BaseUrl"] ?? "https://swapi.info/api/";
    client.BaseAddress = new Uri(baseUrl);
});

builder.Services.AddScoped<ISwapiClient>(sp => new CachingSwapiClient(
    sp.GetRequiredService<HttpSwapiClient>(),
    sp.GetRequiredService<IMemoryCache>(),
    sp.GetRequiredService<IOptions<SwapiCacheOptions>>()));

builder.Services.AddScoped<CharacterRelationResolver>();
builder.Services.AddScoped<ICharacterService, CharacterService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicyName, policy =>
    {
        var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
        policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(CorsPolicyName);
app.MapControllers();

await app.RunAsync();
