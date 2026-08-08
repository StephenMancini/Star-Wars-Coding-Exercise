namespace StarWars.Application.Caching;

public class SwapiCacheOptions
{
    public const string SectionName = "SwapiCache";

    /// <summary>
    /// Relative expiration for cached SWAPI responses. Null (the default) means cache forever,
    /// since the upstream mirror is static — invalidation only happens on process restart.
    /// </summary>
    public TimeSpan? AbsoluteExpirationRelativeToNow { get; set; }
}
