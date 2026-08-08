using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using StarWars.Api.Controllers;
using StarWars.Application.Abstractions;
using StarWars.Application.Dtos;

namespace StarWars.Api.Tests.Controllers;

public class CharactersControllerTests
{
    private readonly Mock<ICharacterService> _characterService = new();
    private readonly CharactersController _sut;

    public CharactersControllerTests()
    {
        _sut = new CharactersController(_characterService.Object);
    }

    [Fact]
    public async Task GetAll_ReturnsOkWithSummaries()
    {
        var summaries = new List<CharacterSummaryDto> { new(1, "Luke Skywalker") };
        _characterService.Setup(s => s.GetAllAsync()).ReturnsAsync(summaries);

        var result = await _sut.GetAll();

        var okResult = result.Result.Should().BeOfType<OkObjectResult>().Subject;
        okResult.Value.Should().BeSameAs(summaries);
    }

    [Fact]
    public async Task GetById_ReturnsOkWithDetail_WhenFound()
    {
        var detail = new CharacterDetailDto(1, "Luke Skywalker", new CharacterAttributesDto("172", "77", "blond", "fair", "blue", "19BBY", "male"), null, null, [], [], []);
        _characterService.Setup(s => s.GetByIdAsync(1)).ReturnsAsync(detail);

        var result = await _sut.GetById(1);

        var okResult = result.Result.Should().BeOfType<OkObjectResult>().Subject;
        okResult.Value.Should().BeSameAs(detail);
    }

    [Fact]
    public async Task GetById_ReturnsNotFound_WhenServiceReturnsNull()
    {
        _characterService.Setup(s => s.GetByIdAsync(999)).ReturnsAsync((CharacterDetailDto?)null);

        var result = await _sut.GetById(999);

        result.Result.Should().BeOfType<NotFoundResult>();
    }
}
