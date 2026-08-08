using FluentAssertions;
using Moq;
using StarWars.Application.Abstractions;
using StarWars.Application.Dtos;
using StarWars.Application.Services;
using StarWars.Application.Swapi;

namespace StarWars.Application.Tests.Services;

public class CharacterServiceTests
{
    private readonly Mock<ISwapiClient> _swapiClient = new();
    private readonly CharacterService _sut;

    public CharacterServiceTests()
    {
        var resolver = new CharacterRelationResolver(_swapiClient.Object);
        _sut = new CharacterService(_swapiClient.Object, resolver);
    }

    [Fact]
    public async Task GetAllAsync_ReturnsSummaryDtosForAllPeople()
    {
        _swapiClient.Setup(c => c.GetAllPeopleAsync()).ReturnsAsync(new List<SwapiPerson>
        {
            new() { Name = "Luke Skywalker", Url = "https://swapi.info/api/people/1/" },
            new() { Name = "Leia Organa", Url = "https://swapi.info/api/people/5/" },
        });

        var result = await _sut.GetAllAsync();

        result.Should().BeEquivalentTo(
        [
            new CharacterSummaryDto(1, "Luke Skywalker"),
            new CharacterSummaryDto(5, "Leia Organa"),
        ]);
    }

    [Fact]
    public async Task GetByIdAsync_ReturnsFullDetailDto_WhenPersonExists()
    {
        var person = new SwapiPerson
        {
            Name = "Luke Skywalker",
            Homeworld = "https://swapi.info/api/planets/1/",
            Url = "https://swapi.info/api/people/1/",
        };
        _swapiClient.Setup(c => c.GetPersonAsync(1)).ReturnsAsync(person);
        _swapiClient.Setup(c => c.GetByUrlAsync<SwapiPlanet>(person.Homeworld))
            .ReturnsAsync(new SwapiPlanet { Name = "Tatooine" });

        var result = await _sut.GetByIdAsync(1);

        result.Should().NotBeNull();
        result!.Id.Should().Be(1);
        result.Name.Should().Be("Luke Skywalker");
        result.Homeworld!.Name.Should().Be("Tatooine");
    }

    [Fact]
    public async Task GetByIdAsync_ReturnsNull_WhenPersonDoesNotExist()
    {
        _swapiClient.Setup(c => c.GetPersonAsync(999)).ReturnsAsync((SwapiPerson?)null);

        var result = await _sut.GetByIdAsync(999);

        result.Should().BeNull();
    }
}
