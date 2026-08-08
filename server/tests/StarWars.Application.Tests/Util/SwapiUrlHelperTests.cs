using FluentAssertions;
using StarWars.Application.Util;

namespace StarWars.Application.Tests.Util;

public class SwapiUrlHelperTests
{
    [Theory]
    [InlineData("https://swapi.info/api/people/1/", 1)]
    [InlineData("https://swapi.info/api/people/1", 1)]
    [InlineData("https://swapi.info/api/planets/10/", 10)]
    [InlineData("https://swapi.info/api/species/23", 23)]
    public void ExtractId_ParsesTrailingNumericIdFromUrl(string url, int expected)
    {
        var result = SwapiUrlHelper.ExtractId(url);

        result.Should().Be(expected);
    }

    [Fact]
    public void ExtractId_ThrowsFormatException_WhenUrlHasNoTrailingNumericId()
    {
        var act = () => SwapiUrlHelper.ExtractId("https://swapi.info/api/people/");

        act.Should().Throw<FormatException>();
    }
}
