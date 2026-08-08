using FluentAssertions;
using StarWars.Application.Mapping;
using StarWars.Application.Services;
using StarWars.Application.Swapi;

namespace StarWars.Application.Tests.Mapping;

public class CharacterMapperTests
{
    private static SwapiPerson MakePerson(string url = "https://swapi.info/api/people/1/") => new()
    {
        Name = "Luke Skywalker",
        Height = "172",
        Mass = "77",
        HairColor = "blond",
        SkinColor = "fair",
        EyeColor = "blue",
        BirthYear = "19BBY",
        Gender = "male",
        Homeworld = "https://swapi.info/api/planets/1/",
        Url = url,
    };

    private static CharacterRelatedResources EmptyRelated() => new(
        Homeworld: null,
        Species: [],
        Films: [],
        Starships: [],
        Vehicles: []);

    [Fact]
    public void ToSummaryDto_MapsIdFromUrlAndName()
    {
        var person = MakePerson("https://swapi.info/api/people/1/");

        var result = CharacterMapper.ToSummaryDto(person);

        result.Id.Should().Be(1);
        result.Name.Should().Be("Luke Skywalker");
    }

    [Fact]
    public void ToDetailDto_MapsAttributesFromPerson()
    {
        var person = MakePerson();

        var result = CharacterMapper.ToDetailDto(person, EmptyRelated());

        result.Id.Should().Be(1);
        result.Name.Should().Be("Luke Skywalker");
        result.Attributes.Height.Should().Be("172");
        result.Attributes.Mass.Should().Be("77");
        result.Attributes.HairColor.Should().Be("blond");
        result.Attributes.SkinColor.Should().Be("fair");
        result.Attributes.EyeColor.Should().Be("blue");
        result.Attributes.BirthYear.Should().Be("19BBY");
        result.Attributes.Gender.Should().Be("male");
    }

    [Fact]
    public void ToDetailDto_MapsFirstSpecies_WhenSpeciesListIsNonEmpty()
    {
        var person = MakePerson();
        var related = EmptyRelated() with
        {
            Species = [new SwapiSpecies { Name = "Human", Classification = "mammal", Designation = "sentient", AverageHeight = "180", AverageLifespan = "120", Language = "Galactic Basic" }],
        };

        var result = CharacterMapper.ToDetailDto(person, related);

        result.Species.Should().NotBeNull();
        result.Species!.Name.Should().Be("Human");
        result.Species.AverageLifespan.Should().Be("120");
    }

    [Fact]
    public void ToDetailDto_MapsSpeciesAsNull_WhenSpeciesListIsEmpty()
    {
        var person = MakePerson();

        var result = CharacterMapper.ToDetailDto(person, EmptyRelated());

        result.Species.Should().BeNull();
    }

    [Fact]
    public void ToDetailDto_MapsHomeworld_WhenPresent()
    {
        var person = MakePerson();
        var related = EmptyRelated() with
        {
            Homeworld = new SwapiPlanet { Name = "Tatooine", Population = "200000", Terrain = "desert", Climate = "arid", SurfaceWater = "1", Diameter = "10465", RotationPeriod = "23", OrbitalPeriod = "304", Gravity = "1 standard" },
        };

        var result = CharacterMapper.ToDetailDto(person, related);

        result.Homeworld.Should().NotBeNull();
        result.Homeworld!.Name.Should().Be("Tatooine");
        result.Homeworld.Population.Should().Be("200000");
    }

    [Fact]
    public void ToDetailDto_MapsHomeworldAsNull_WhenNotPresent()
    {
        var person = MakePerson();

        var result = CharacterMapper.ToDetailDto(person, EmptyRelated());

        result.Homeworld.Should().BeNull();
    }

    [Fact]
    public void ToDetailDto_MapsFilmsStarshipsAndVehicles()
    {
        var person = MakePerson();
        var related = EmptyRelated() with
        {
            Films = [new SwapiFilm { Title = "A New Hope", EpisodeId = 4 }],
            Starships = [new SwapiStarship { Name = "X-wing", Model = "T-65", Manufacturer = "Incom", Crew = "1", Passengers = "0", StarshipClass = "Starfighter" }],
            Vehicles = [new SwapiVehicle { Name = "Snowspeeder", Model = "t-47", Manufacturer = "Incom", Crew = "2", Passengers = "0", VehicleClass = "airspeeder" }],
        };

        var result = CharacterMapper.ToDetailDto(person, related);

        result.Films.Should().ContainSingle(f => f.Title == "A New Hope" && f.EpisodeId == 4);
        result.Starships.Should().ContainSingle(s => s.Name == "X-wing");
        result.Vehicles.Should().ContainSingle(v => v.Name == "Snowspeeder");
    }

    [Fact]
    public void ToDetailDto_MapsFilmsStarshipsAndVehiclesAsEmptyArrays_NotNull_WhenNoneProvided()
    {
        var person = MakePerson();

        var result = CharacterMapper.ToDetailDto(person, EmptyRelated());

        result.Films.Should().NotBeNull().And.BeEmpty();
        result.Starships.Should().NotBeNull().And.BeEmpty();
        result.Vehicles.Should().NotBeNull().And.BeEmpty();
    }
}
