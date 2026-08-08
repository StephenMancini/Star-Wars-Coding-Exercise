namespace StarWars.Application.Dtos;

public record CharacterDetailDto(
    int Id,
    string Name,
    CharacterAttributesDto Attributes,
    SpeciesDto? Species,
    HomeworldDto? Homeworld,
    IReadOnlyList<FilmDto> Films,
    IReadOnlyList<StarshipDto> Starships,
    IReadOnlyList<VehicleDto> Vehicles);
