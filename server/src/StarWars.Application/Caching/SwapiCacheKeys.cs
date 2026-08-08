namespace StarWars.Application.Caching;

public static class SwapiCacheKeys
{
    public const string AllPeople = "swapi:people:all";

    public static string Person(int id) => $"swapi:person:{id}";

    public static string Resource(string url) => $"swapi:resource:{url}";
}
