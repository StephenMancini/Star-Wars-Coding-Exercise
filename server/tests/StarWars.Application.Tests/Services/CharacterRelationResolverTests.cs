using FluentAssertions;
using Moq;
using StarWars.Application.Abstractions;
using StarWars.Application.Services;
using StarWars.Application.Swapi;

namespace StarWars.Application.Tests.Services;

public class CharacterRelationResolverTests
{
    private readonly Mock<ISwapiClient> _swapiClient = new();
    private readonly CharacterRelationResolver _sut;

    public CharacterRelationResolverTests()
    {
        _sut = new CharacterRelationResolver(_swapiClient.Object);
    }

    private static SwapiPerson MakePerson() => new()
    {
        Name = "Luke Skywalker",
        Homeworld = "https://swapi.info/api/planets/1/",
        Species = ["https://swapi.info/api/species/1/"],
        Films = ["https://swapi.info/api/films/1/", "https://swapi.info/api/films/2/"],
        Starships = ["https://swapi.info/api/starships/12/"],
        Vehicles = ["https://swapi.info/api/vehicles/14/"],
        Url = "https://swapi.info/api/people/1/",
    };

    [Fact]
    public async Task ResolveAsync_RequestsHomeworldExactlyOnce()
    {
        var person = MakePerson();
        _swapiClient.Setup(c => c.GetByUrlAsync<SwapiPlanet>(person.Homeworld))
            .ReturnsAsync(new SwapiPlanet { Name = "Tatooine" });

        var result = await _sut.ResolveAsync(person);

        result.Homeworld.Should().NotBeNull();
        result.Homeworld!.Name.Should().Be("Tatooine");
        _swapiClient.Verify(c => c.GetByUrlAsync<SwapiPlanet>(person.Homeworld), Times.Once);
    }

    [Fact]
    public async Task ResolveAsync_RequestsEachSpeciesUrlExactlyOnce()
    {
        var person = MakePerson();
        _swapiClient.Setup(c => c.GetByUrlAsync<SwapiSpecies>(person.Species[0]))
            .ReturnsAsync(new SwapiSpecies { Name = "Human" });

        var result = await _sut.ResolveAsync(person);

        result.Species.Should().ContainSingle(s => s.Name == "Human");
        _swapiClient.Verify(c => c.GetByUrlAsync<SwapiSpecies>(person.Species[0]), Times.Once);
    }

    [Fact]
    public async Task ResolveAsync_RequestsEachFilmUrlExactlyOnce()
    {
        var person = MakePerson();
        _swapiClient.Setup(c => c.GetByUrlAsync<SwapiFilm>(person.Films[0]))
            .ReturnsAsync(new SwapiFilm { Title = "A New Hope", EpisodeId = 4 });
        _swapiClient.Setup(c => c.GetByUrlAsync<SwapiFilm>(person.Films[1]))
            .ReturnsAsync(new SwapiFilm { Title = "The Empire Strikes Back", EpisodeId = 5 });

        var result = await _sut.ResolveAsync(person);

        result.Films.Should().HaveCount(2);
        result.Films.Should().Contain(f => f.Title == "A New Hope");
        result.Films.Should().Contain(f => f.Title == "The Empire Strikes Back");
        _swapiClient.Verify(c => c.GetByUrlAsync<SwapiFilm>(person.Films[0]), Times.Once);
        _swapiClient.Verify(c => c.GetByUrlAsync<SwapiFilm>(person.Films[1]), Times.Once);
    }

    [Fact]
    public async Task ResolveAsync_RequestsEachStarshipUrlExactlyOnce()
    {
        var person = MakePerson();
        _swapiClient.Setup(c => c.GetByUrlAsync<SwapiStarship>(person.Starships[0]))
            .ReturnsAsync(new SwapiStarship { Name = "X-wing" });

        var result = await _sut.ResolveAsync(person);

        result.Starships.Should().ContainSingle(s => s.Name == "X-wing");
        _swapiClient.Verify(c => c.GetByUrlAsync<SwapiStarship>(person.Starships[0]), Times.Once);
    }

    [Fact]
    public async Task ResolveAsync_RequestsEachVehicleUrlExactlyOnce()
    {
        var person = MakePerson();
        _swapiClient.Setup(c => c.GetByUrlAsync<SwapiVehicle>(person.Vehicles[0]))
            .ReturnsAsync(new SwapiVehicle { Name = "Snowspeeder" });

        var result = await _sut.ResolveAsync(person);

        result.Vehicles.Should().ContainSingle(v => v.Name == "Snowspeeder");
        _swapiClient.Verify(c => c.GetByUrlAsync<SwapiVehicle>(person.Vehicles[0]), Times.Once);
    }

    [Fact]
    public async Task ResolveAsync_ReturnsNullHomeworldAndEmptyCollections_WhenPersonHasNoRelatedUrls()
    {
        var person = new SwapiPerson { Name = "Unknown", Homeworld = "", Url = "https://swapi.info/api/people/99/" };

        var result = await _sut.ResolveAsync(person);

        result.Homeworld.Should().BeNull();
        result.Species.Should().BeEmpty();
        result.Films.Should().BeEmpty();
        result.Starships.Should().BeEmpty();
        result.Vehicles.Should().BeEmpty();
        _swapiClient.Verify(c => c.GetByUrlAsync<SwapiPlanet>(It.IsAny<string>()), Times.Never);
    }
}
