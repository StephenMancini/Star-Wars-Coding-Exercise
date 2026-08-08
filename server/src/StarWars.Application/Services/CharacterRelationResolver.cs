using StarWars.Application.Abstractions;
using StarWars.Application.Swapi;

namespace StarWars.Application.Services;

public class CharacterRelationResolver(ISwapiClient swapiClient)
{
    // SWAPI leaves a character's species array empty when they're Human — Human is
    // the upstream API's implicit default rather than an explicit species entry.
    // Relative so it still resolves correctly if Swapi:BaseUrl is ever reconfigured.
    private const string DefaultHumanSpeciesUrl = "species/1/";

    public async Task<CharacterRelatedResources> ResolveAsync(SwapiPerson person)
    {
        var homeworldTask = ResolveHomeworldAsync(person.Homeworld);
        var speciesTask = ResolveAllAsync<SwapiSpecies>(SpeciesUrlsOrHumanDefault(person));
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

    private static IReadOnlyList<string> SpeciesUrlsOrHumanDefault(SwapiPerson person) =>
        person.Species.Length > 0 ? person.Species : [DefaultHumanSpeciesUrl];

    private async Task<SwapiPlanet?> ResolveHomeworldAsync(string url) =>
        string.IsNullOrEmpty(url) ? null : await swapiClient.GetByUrlAsync<SwapiPlanet>(url);

    private async Task<IReadOnlyList<T>> ResolveAllAsync<T>(IReadOnlyList<string> urls) where T : class
    {
        var results = await Task.WhenAll(urls.Select(swapiClient.GetByUrlAsync<T>));
        return results.Where(r => r is not null).Select(r => r!).ToList();
    }
}
