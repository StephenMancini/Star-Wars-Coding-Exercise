namespace StarWars.Application.Dtos;

public record CharacterAttributesDto(
    string Height,
    string Mass,
    string HairColor,
    string SkinColor,
    string EyeColor,
    string BirthYear,
    string Gender);
