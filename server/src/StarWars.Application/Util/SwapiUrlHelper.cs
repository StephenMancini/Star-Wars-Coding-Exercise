using System.Text.RegularExpressions;

namespace StarWars.Application.Util;

public static partial class SwapiUrlHelper
{
    public static int ExtractId(string url)
    {
        var match = TrailingIdRegex().Match(url);
        if (!match.Success)
        {
            throw new FormatException($"Could not extract a numeric id from SWAPI url '{url}'.");
        }

        return int.Parse(match.Groups[1].Value);
    }

    [GeneratedRegex(@"/(\d+)/?$")]
    private static partial Regex TrailingIdRegex();
}
