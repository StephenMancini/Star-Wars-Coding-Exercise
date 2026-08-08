using FluentAssertions;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Moq;
using StarWars.Application.Abstractions;
using StarWars.Application.Caching;
using StarWars.Application.Infrastructure;
using StarWars.Application.Swapi;

namespace StarWars.Application.Tests.Infrastructure;

public class CachingSwapiClientTests
{
    private readonly Mock<ISwapiClient> _inner = new();
    private readonly CachingSwapiClient _sut;

    public CachingSwapiClientTests()
    {
        var cache = new MemoryCache(new MemoryCacheOptions());
        var options = Options.Create(new SwapiCacheOptions());
        _sut = new CachingSwapiClient(_inner.Object, cache, options);
    }

    [Fact]
    public async Task GetAllPeopleAsync_CalledTwice_HitsInnerClientOnce()
    {
        _inner.Setup(c => c.GetAllPeopleAsync()).ReturnsAsync(new List<SwapiPerson> { new() { Name = "Luke Skywalker" } });

        await _sut.GetAllPeopleAsync();
        await _sut.GetAllPeopleAsync();

        _inner.Verify(c => c.GetAllPeopleAsync(), Times.Once);
    }

    [Fact]
    public async Task GetPersonAsync_CalledTwiceWithSameId_HitsInnerClientOnce()
    {
        _inner.Setup(c => c.GetPersonAsync(1)).ReturnsAsync(new SwapiPerson { Name = "Luke Skywalker" });

        await _sut.GetPersonAsync(1);
        await _sut.GetPersonAsync(1);

        _inner.Verify(c => c.GetPersonAsync(1), Times.Once);
    }

    [Fact]
    public async Task GetPersonAsync_CalledWithDifferentIds_HitsInnerClientPerId()
    {
        _inner.Setup(c => c.GetPersonAsync(1)).ReturnsAsync(new SwapiPerson { Name = "Luke Skywalker" });
        _inner.Setup(c => c.GetPersonAsync(2)).ReturnsAsync(new SwapiPerson { Name = "Leia Organa" });

        await _sut.GetPersonAsync(1);
        await _sut.GetPersonAsync(2);

        _inner.Verify(c => c.GetPersonAsync(1), Times.Once);
        _inner.Verify(c => c.GetPersonAsync(2), Times.Once);
    }

    [Fact]
    public async Task GetByUrlAsync_CalledTwiceWithSameUrl_HitsInnerClientOnce()
    {
        const string url = "https://swapi.info/api/planets/1/";
        _inner.Setup(c => c.GetByUrlAsync<SwapiPlanet>(url)).ReturnsAsync(new SwapiPlanet { Name = "Tatooine" });

        await _sut.GetByUrlAsync<SwapiPlanet>(url);
        await _sut.GetByUrlAsync<SwapiPlanet>(url);

        _inner.Verify(c => c.GetByUrlAsync<SwapiPlanet>(url), Times.Once);
    }

    [Fact]
    public async Task GetByUrlAsync_CalledWithDifferentUrls_HitsInnerClientPerUrl()
    {
        const string tatooine = "https://swapi.info/api/planets/1/";
        const string alderaan = "https://swapi.info/api/planets/2/";
        _inner.Setup(c => c.GetByUrlAsync<SwapiPlanet>(tatooine)).ReturnsAsync(new SwapiPlanet { Name = "Tatooine" });
        _inner.Setup(c => c.GetByUrlAsync<SwapiPlanet>(alderaan)).ReturnsAsync(new SwapiPlanet { Name = "Alderaan" });

        await _sut.GetByUrlAsync<SwapiPlanet>(tatooine);
        await _sut.GetByUrlAsync<SwapiPlanet>(alderaan);

        _inner.Verify(c => c.GetByUrlAsync<SwapiPlanet>(tatooine), Times.Once);
        _inner.Verify(c => c.GetByUrlAsync<SwapiPlanet>(alderaan), Times.Once);
    }

    [Fact]
    public async Task GetByUrlAsync_ReturnsCachedValue()
    {
        const string url = "https://swapi.info/api/planets/1/";
        _inner.Setup(c => c.GetByUrlAsync<SwapiPlanet>(url)).ReturnsAsync(new SwapiPlanet { Name = "Tatooine" });

        await _sut.GetByUrlAsync<SwapiPlanet>(url);
        var second = await _sut.GetByUrlAsync<SwapiPlanet>(url);

        second.Should().NotBeNull();
        second!.Name.Should().Be("Tatooine");
    }
}
