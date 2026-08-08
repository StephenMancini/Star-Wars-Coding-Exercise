using System.Net;
using System.Text;
using FluentAssertions;
using StarWars.Application.Infrastructure;
using StarWars.Application.Swapi;
using StarWars.Application.Tests.TestUtilities;

namespace StarWars.Application.Tests.Infrastructure;

public class HttpSwapiClientTests
{
    private const string BaseUrl = "https://swapi.info/api/";

    private static HttpSwapiClient CreateClient(FakeHttpMessageHandler handler) =>
        new(new HttpClient(handler) { BaseAddress = new Uri(BaseUrl) });

    private static HttpResponseMessage JsonResponse(HttpStatusCode status, string json) => new(status)
    {
        Content = new StringContent(json, Encoding.UTF8, "application/json"),
    };

    [Fact]
    public async Task GetAllPeopleAsync_DeserializesPersonArray()
    {
        const string json = """
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
            "films": ["https://swapi.info/api/films/1/"],
            "species": [],
            "vehicles": ["https://swapi.info/api/vehicles/14/"],
            "starships": ["https://swapi.info/api/starships/12/"],
            "url": "https://swapi.info/api/people/1/"
          }
        ]
        """;
        var handler = new FakeHttpMessageHandler(_ => JsonResponse(HttpStatusCode.OK, json));
        var client = CreateClient(handler);

        var result = await client.GetAllPeopleAsync();

        result.Should().ContainSingle();
        result[0].Name.Should().Be("Luke Skywalker");
        result[0].Homeworld.Should().Be("https://swapi.info/api/planets/1/");
        result[0].Films.Should().Equal("https://swapi.info/api/films/1/");
        result[0].Species.Should().BeEmpty();
        handler.LastRequest!.RequestUri!.ToString().Should().Be($"{BaseUrl}people");
    }

    [Fact]
    public async Task GetPersonAsync_DeserializesSingleRecord_AndRequestsCorrectUrl()
    {
        const string json = """
        {
          "name": "Leia Organa",
          "height": "150",
          "mass": "49",
          "hair_color": "brown",
          "skin_color": "light",
          "eye_color": "brown",
          "birth_year": "19BBY",
          "gender": "female",
          "homeworld": "https://swapi.info/api/planets/2/",
          "films": [],
          "species": [],
          "vehicles": [],
          "starships": [],
          "url": "https://swapi.info/api/people/5/"
        }
        """;
        var handler = new FakeHttpMessageHandler(_ => JsonResponse(HttpStatusCode.OK, json));
        var client = CreateClient(handler);

        var result = await client.GetPersonAsync(5);

        result.Should().NotBeNull();
        result!.Name.Should().Be("Leia Organa");
        handler.LastRequest!.RequestUri!.ToString().Should().Be($"{BaseUrl}people/5");
    }

    [Fact]
    public async Task GetPersonAsync_ReturnsNull_WhenUpstreamReturns404()
    {
        var handler = new FakeHttpMessageHandler(_ => new HttpResponseMessage(HttpStatusCode.NotFound));
        var client = CreateClient(handler);

        var result = await client.GetPersonAsync(999);

        result.Should().BeNull();
    }

    [Fact]
    public async Task GetByUrlAsync_DeserializesPlanet()
    {
        const string url = "https://swapi.info/api/planets/1/";
        const string json = """{"name":"Tatooine","rotation_period":"23","orbital_period":"304","diameter":"10465","climate":"arid","gravity":"1 standard","terrain":"desert","surface_water":"1","population":"200000","url":"https://swapi.info/api/planets/1/"}""";
        var handler = new FakeHttpMessageHandler(_ => JsonResponse(HttpStatusCode.OK, json));
        var client = CreateClient(handler);

        var result = await client.GetByUrlAsync<SwapiPlanet>(url);

        result.Should().NotBeNull();
        result!.Name.Should().Be("Tatooine");
        handler.LastRequest!.RequestUri!.ToString().Should().Be(url);
    }

    [Fact]
    public async Task GetByUrlAsync_DeserializesSpecies()
    {
        const string url = "https://swapi.info/api/species/1/";
        const string json = """{"name":"Human","classification":"mammal","designation":"sentient","average_height":"180","average_lifespan":"120","language":"Galactic Basic","url":"https://swapi.info/api/species/1/"}""";
        var handler = new FakeHttpMessageHandler(_ => JsonResponse(HttpStatusCode.OK, json));
        var client = CreateClient(handler);

        var result = await client.GetByUrlAsync<SwapiSpecies>(url);

        result.Should().NotBeNull();
        result!.Name.Should().Be("Human");
        handler.LastRequest!.RequestUri!.ToString().Should().Be(url);
    }

    [Fact]
    public async Task GetByUrlAsync_DeserializesFilm()
    {
        const string url = "https://swapi.info/api/films/1/";
        const string json = """{"title":"A New Hope","episode_id":4,"url":"https://swapi.info/api/films/1/"}""";
        var handler = new FakeHttpMessageHandler(_ => JsonResponse(HttpStatusCode.OK, json));
        var client = CreateClient(handler);

        var result = await client.GetByUrlAsync<SwapiFilm>(url);

        result.Should().NotBeNull();
        result!.Title.Should().Be("A New Hope");
        result.EpisodeId.Should().Be(4);
        handler.LastRequest!.RequestUri!.ToString().Should().Be(url);
    }

    [Fact]
    public async Task GetByUrlAsync_DeserializesStarship()
    {
        const string url = "https://swapi.info/api/starships/12/";
        const string json = """{"name":"X-wing","model":"T-65 X-wing","manufacturer":"Incom Corporation","crew":"1","passengers":"0","starship_class":"Starfighter","url":"https://swapi.info/api/starships/12/"}""";
        var handler = new FakeHttpMessageHandler(_ => JsonResponse(HttpStatusCode.OK, json));
        var client = CreateClient(handler);

        var result = await client.GetByUrlAsync<SwapiStarship>(url);

        result.Should().NotBeNull();
        result!.Name.Should().Be("X-wing");
        handler.LastRequest!.RequestUri!.ToString().Should().Be(url);
    }

    [Fact]
    public async Task GetByUrlAsync_DeserializesVehicle()
    {
        const string url = "https://swapi.info/api/vehicles/14/";
        const string json = """{"name":"Snowspeeder","model":"t-47 airspeeder","manufacturer":"Incom corporation","crew":"2","passengers":"0","vehicle_class":"airspeeder","url":"https://swapi.info/api/vehicles/14/"}""";
        var handler = new FakeHttpMessageHandler(_ => JsonResponse(HttpStatusCode.OK, json));
        var client = CreateClient(handler);

        var result = await client.GetByUrlAsync<SwapiVehicle>(url);

        result.Should().NotBeNull();
        result!.Name.Should().Be("Snowspeeder");
        handler.LastRequest!.RequestUri!.ToString().Should().Be(url);
    }

    [Fact]
    public async Task GetByUrlAsync_ReturnsNull_WhenUpstreamReturns404()
    {
        var handler = new FakeHttpMessageHandler(_ => new HttpResponseMessage(HttpStatusCode.NotFound));
        var client = CreateClient(handler);

        var result = await client.GetByUrlAsync<SwapiPlanet>("https://swapi.info/api/planets/999/");

        result.Should().BeNull();
    }
}
