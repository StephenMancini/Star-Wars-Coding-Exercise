using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using StarWars.Application.Abstractions;
using StarWars.Application.Caching;
using StarWars.Application.Swapi;

namespace StarWars.Application.Infrastructure;

public class CachingSwapiClient(ISwapiClient inner, IMemoryCache cache, IOptions<SwapiCacheOptions> options) : ISwapiClient
{
    private readonly SwapiCacheOptions _options = options.Value;

    public Task<IReadOnlyList<SwapiPerson>> GetAllPeopleAsync() =>
        GetOrCreateAsync(SwapiCacheKeys.AllPeople, inner.GetAllPeopleAsync);

    public Task<SwapiPerson?> GetPersonAsync(int id) =>
        GetOrCreateAsync(SwapiCacheKeys.Person(id), () => inner.GetPersonAsync(id));

    public Task<T?> GetByUrlAsync<T>(string url) where T : class =>
        GetOrCreateAsync(SwapiCacheKeys.Resource(url), () => inner.GetByUrlAsync<T>(url));

    private async Task<TValue> GetOrCreateAsync<TValue>(string key, Func<Task<TValue>> factory)
    {
        if (cache.TryGetValue(key, out TValue? cached))
        {
            return cached!;
        }

        var value = await factory();
        cache.Set(key, value, new MemoryCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = _options.AbsoluteExpirationRelativeToNow,
        });
        return value;
    }
}
