using StarWars.Application.Dtos;
using StarWars.Application.Services;
using StarWars.Application.Swapi;
using StarWars.Application.Util;

namespace StarWars.Application.Mapping;

public static class CharacterMapper
{
    public static CharacterSummaryDto ToSummaryDto(SwapiPerson person) =>
        new(SwapiUrlHelper.ExtractId(person.Url), person.Name);

    public static CharacterDetailDto ToDetailDto(SwapiPerson person, CharacterRelatedResources related) =>
        new(
            SwapiUrlHelper.ExtractId(person.Url),
            person.Name,
            ToAttributesDto(person),
            related.Species.Count > 0 ? ToSpeciesDto(related.Species[0]) : null,
            related.Homeworld is not null ? ToHomeworldDto(related.Homeworld) : null,
            related.Films.Select(ToFilmDto).ToList(),
            related.Starships.Select(ToStarshipDto).ToList(),
            related.Vehicles.Select(ToVehicleDto).ToList());

    private static CharacterAttributesDto ToAttributesDto(SwapiPerson person) => new(
        person.Height,
        person.Mass,
        person.HairColor,
        person.SkinColor,
        person.EyeColor,
        person.BirthYear,
        person.Gender);

    private static SpeciesDto ToSpeciesDto(SwapiSpecies species) => new(
        species.Name,
        species.Classification,
        species.Designation,
        species.AverageHeight,
        species.AverageLifespan,
        species.Language);

    private static HomeworldDto ToHomeworldDto(SwapiPlanet planet) => new(
        planet.Name,
        planet.Population,
        planet.Terrain,
        planet.Climate,
        planet.SurfaceWater,
        planet.Diameter,
        planet.RotationPeriod,
        planet.OrbitalPeriod,
        planet.Gravity);

    private static FilmDto ToFilmDto(SwapiFilm film) => new(film.Title, film.EpisodeId);

    private static StarshipDto ToStarshipDto(SwapiStarship starship) => new(
        starship.Name,
        starship.Model,
        starship.Manufacturer,
        starship.Crew,
        starship.Passengers,
        starship.StarshipClass);

    private static VehicleDto ToVehicleDto(SwapiVehicle vehicle) => new(
        vehicle.Name,
        vehicle.Model,
        vehicle.Manufacturer,
        vehicle.Crew,
        vehicle.Passengers,
        vehicle.VehicleClass);
}
