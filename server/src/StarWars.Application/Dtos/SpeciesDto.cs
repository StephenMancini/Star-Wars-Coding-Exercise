namespace StarWars.Application.Dtos;

public record SpeciesDto(
    string Name,
    string Classification,
    string Designation,
    string AverageHeight,
    string AverageLifespan,
    string Language);
