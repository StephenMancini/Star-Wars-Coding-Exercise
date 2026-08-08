namespace StarWars.Application.Dtos;

public record HomeworldDto(
    string Name,
    string Population,
    string Terrain,
    string Climate,
    string SurfaceWater,
    string Diameter,
    string RotationPeriod,
    string OrbitalPeriod,
    string Gravity);
