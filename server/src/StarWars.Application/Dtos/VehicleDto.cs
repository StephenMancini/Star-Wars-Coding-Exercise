namespace StarWars.Application.Dtos;

public record VehicleDto(
    string Name,
    string Model,
    string Manufacturer,
    string Crew,
    string Passengers,
    string VehicleClass);
