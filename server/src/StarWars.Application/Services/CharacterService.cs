using StarWars.Application.Abstractions;
using StarWars.Application.Dtos;
using StarWars.Application.Mapping;

namespace StarWars.Application.Services;

public class CharacterService(ISwapiClient swapiClient, CharacterRelationResolver relationResolver) : ICharacterService
{
    public async Task<IReadOnlyList<CharacterSummaryDto>> GetAllAsync()
    {
        var people = await swapiClient.GetAllPeopleAsync();
        return people.Select(CharacterMapper.ToSummaryDto).ToList();
    }

    public async Task<CharacterDetailDto?> GetByIdAsync(int id)
    {
        var person = await swapiClient.GetPersonAsync(id);
        if (person is null)
        {
            return null;
        }

        var related = await relationResolver.ResolveAsync(person);
        return CharacterMapper.ToDetailDto(person, related);
    }
}
