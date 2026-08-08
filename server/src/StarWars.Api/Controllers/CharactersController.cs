using Microsoft.AspNetCore.Mvc;
using StarWars.Application.Abstractions;
using StarWars.Application.Dtos;

namespace StarWars.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CharactersController(ICharacterService characterService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<CharacterSummaryDto>>> GetAll()
    {
        var characters = await characterService.GetAllAsync();
        return Ok(characters);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<CharacterDetailDto>> GetById(int id)
    {
        var character = await characterService.GetByIdAsync(id);
        return character is null ? NotFound() : Ok(character);
    }
}
