namespace StarWars.Application.Dtos;

public record StarshipDto(
    string Name,
    string Model,
    string Manufacturer,
    string Crew,
    string Passengers,
    string StarshipClass);
