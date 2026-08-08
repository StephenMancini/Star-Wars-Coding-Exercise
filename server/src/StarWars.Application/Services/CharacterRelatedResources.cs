using StarWars.Application.Swapi;

namespace StarWars.Application.Services;

/// <summary>
/// The raw SWAPI records a character's URL-linked fields resolve to. Species is a list
/// because SwapiPerson.Species is an array upstream, even though the wireframe only ever
/// displays the first one — that display rule lives in CharacterMapper, not here.
/// </summary>
public record CharacterRelatedResources(
    SwapiPlanet? Homeworld,
    IReadOnlyList<SwapiSpecies> Species,
    IReadOnlyList<SwapiFilm> Films,
    IReadOnlyList<SwapiStarship> Starships,
    IReadOnlyList<SwapiVehicle> Vehicles);
