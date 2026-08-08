using StarWars.Application.Abstractions;
using StarWars.Application.Swapi;

namespace StarWars.Application.Services;

public class CharacterRelationResolver(ISwapiClient swapiClient)
{
    public async Task<CharacterRelatedResources> ResolveAsync(SwapiPerson person)
    {
        var homeworldTask = ResolveHomeworldAsync(person.Homeworld);
        var speciesTask = ResolveAllAsync<SwapiSpecies>(person.Species);
        var filmsTask = ResolveAllAsync<SwapiFilm>(person.Films);
        var starshipsTask = ResolveAllAsync<SwapiStarship>(person.Starships);
        var vehiclesTask = ResolveAllAsync<SwapiVehicle>(person.Vehicles);

        await Task.WhenAll(homeworldTask, speciesTask, filmsTask, starshipsTask, vehiclesTask);

        return new CharacterRelatedResources(
            await homeworldTask,
            await speciesTask,
            await filmsTask,
            await starshipsTask,
            await vehiclesTask);
    }

    private async Task<SwapiPlanet?> ResolveHomeworldAsync(string url) =>
        string.IsNullOrEmpty(url) ? null : await swapiClient.GetByUrlAsync<SwapiPlanet>(url);

    private async Task<IReadOnlyList<T>> ResolveAllAsync<T>(IReadOnlyList<string> urls) where T : class
    {
        var results = await Task.WhenAll(urls.Select(swapiClient.GetByUrlAsync<T>));
        return results.Where(r => r is not null).Select(r => r!).ToList();
    }
}
