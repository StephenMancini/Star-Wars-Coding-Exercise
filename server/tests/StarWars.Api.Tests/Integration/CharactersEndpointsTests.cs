using System.Net;
using System.Net.Http.Json;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using FluentAssertions;
using StarWars.Api.Tests.TestUtilities;
using StarWars.Application.Dtos;
using StarWars.Application.Infrastructure;

namespace StarWars.Api.Tests.Integration;

public class CharactersEndpointsTests
{
    private const string PeopleListJson = """
    [
      {
        "name": "Luke Skywalker",
        "height": "172",
        "mass": "77",
        "hair_color": "blond",
        "skin_color": "fair",
        "eye_color": "blue",
        "birth_year": "19BBY",
        "gender": "male",
        "homeworld": "https://swapi.info/api/planets/1/",
        "films": [],
        "species": [],
        "vehicles": [],
        "starships": [],
        "url": "https://swapi.info/api/people/1/"
      }
    ]
    """;

    private const string PersonJson = """
    {
      "name": "Luke Skywalker",
      "height": "172",
      "mass": "77",
      "hair_color": "blond",
      "skin_color": "fair",
      "eye_color": "blue",
      "birth_year": "19BBY",
      "gender": "male",
      "homeworld": "https://swapi.info/api/planets/1/",
      "films": [],
      "species": [],
      "vehicles": [],
      "starships": [],
      "url": "https://swapi.info/api/people/1/"
    }
    """;

    private const string PlanetJson = """
    {"name":"Tatooine","rotation_period":"23","orbital_period":"304","diameter":"10465","climate":"arid","gravity":"1 standard","terrain":"desert","surface_water":"1","population":"200000","url":"https://swapi.info/api/planets/1/"}
    """;

    private static HttpResponseMessage JsonResponse(string json) => new(HttpStatusCode.OK)
    {
        Content = new StringContent(json, Encoding.UTF8, "application/json"),
    };

    private static WebApplicationFactory<Program> CreateFactory(FakeHttpMessageHandler handler)
    {
        return new WebApplicationFactory<Program>().WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.AddHttpClient<HttpSwapiClient>(client =>
                {
                    client.BaseAddress = new Uri("https://swapi.info/api/");
                }).ConfigurePrimaryHttpMessageHandler(() => handler);
            });
        });
    }

    [Fact]
    public async Task GetCharacters_ReturnsOkWithMappedSummaries()
    {
        var handler = new FakeHttpMessageHandler(req => req.RequestUri!.ToString().EndsWith("/people")
            ? JsonResponse(PeopleListJson)
            : new HttpResponseMessage(HttpStatusCode.NotFound));
        using var factory = CreateFactory(handler);
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/characters");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var summaries = await response.Content.ReadFromJsonAsync<List<CharacterSummaryDto>>();
        summaries.Should().ContainSingle(c => c.Id == 1 && c.Name == "Luke Skywalker");
    }

    [Fact]
    public async Task GetCharacterById_ReturnsFullDetail_ResolvingHomeworld()
    {
        var handler = new FakeHttpMessageHandler(req =>
        {
            var url = req.RequestUri!.ToString();
            if (url.EndsWith("/people/1"))
            {
                return JsonResponse(PersonJson);
            }

            return url.Contains("/planets/1")
                ? JsonResponse(PlanetJson)
                : new HttpResponseMessage(HttpStatusCode.NotFound);
        });
        using var factory = CreateFactory(handler);
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/characters/1");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var detail = await response.Content.ReadFromJsonAsync<CharacterDetailDto>();
        detail.Should().NotBeNull();
        detail!.Name.Should().Be("Luke Skywalker");
        detail.Homeworld.Should().NotBeNull();
        detail.Homeworld!.Name.Should().Be("Tatooine");
    }

    [Fact]
    public async Task GetCharacterById_ReturnsNotFound_WhenPersonDoesNotExist()
    {
        var handler = new FakeHttpMessageHandler(_ => new HttpResponseMessage(HttpStatusCode.NotFound));
        using var factory = CreateFactory(handler);
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/characters/999");

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task GetCharacters_CalledTwice_OnlyHitsUpstreamOnceDueToCaching()
    {
        var handler = new FakeHttpMessageHandler(req => req.RequestUri!.ToString().EndsWith("/people")
            ? JsonResponse(PeopleListJson)
            : new HttpResponseMessage(HttpStatusCode.NotFound));
        using var factory = CreateFactory(handler);
        var client = factory.CreateClient();

        await client.GetAsync("/api/characters");
        await client.GetAsync("/api/characters");

        handler.CallCount.Should().Be(1);
    }
}
