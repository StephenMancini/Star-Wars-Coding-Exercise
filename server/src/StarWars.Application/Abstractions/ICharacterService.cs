using StarWars.Application.Dtos;

namespace StarWars.Application.Abstractions;

public interface ICharacterService
{
    Task<IReadOnlyList<CharacterSummaryDto>> GetAllAsync();

    Task<CharacterDetailDto?> GetByIdAsync(int id);
}
