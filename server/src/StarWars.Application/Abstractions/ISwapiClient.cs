using StarWars.Application.Swapi;

namespace StarWars.Application.Abstractions;

public interface ISwapiClient
{
    Task<IReadOnlyList<SwapiPerson>> GetAllPeopleAsync();

    Task<SwapiPerson?> GetPersonAsync(int id);

    Task<T?> GetByUrlAsync<T>(string url) where T : class;
}
