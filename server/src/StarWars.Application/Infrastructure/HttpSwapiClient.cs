using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using StarWars.Application.Abstractions;
using StarWars.Application.Swapi;

namespace StarWars.Application.Infrastructure;

public class HttpSwapiClient(HttpClient httpClient) : ISwapiClient
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
    };

    public async Task<IReadOnlyList<SwapiPerson>> GetAllPeopleAsync()
    {
        var people = await httpClient.GetFromJsonAsync<List<SwapiPerson>>("people", JsonOptions);
        return people ?? [];
    }

    public async Task<SwapiPerson?> GetPersonAsync(int id)
    {
        var response = await httpClient.GetAsync($"people/{id}");
        if (response.StatusCode == HttpStatusCode.NotFound)
        {
            return null;
        }

        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<SwapiPerson>(JsonOptions);
    }

    public async Task<T?> GetByUrlAsync<T>(string url) where T : class
    {
        var response = await httpClient.GetAsync(url);
        if (response.StatusCode == HttpStatusCode.NotFound)
        {
            return null;
        }

        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<T>(JsonOptions);
    }
}
