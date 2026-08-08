# Star Wars Character Datapad

A character explorer for the Star Wars universe: search and browse characters, then
inspect their attributes, species, homeworld, films, starships, and vehicles.

Data is sourced from [swapi.info](https://swapi.info/api), a static mirror of the
Star Wars API.

## Architecture

- **`client/`** — React + TypeScript (Vite) single-page app. Fetches the character
  list once and filters it instantly client-side as the user types.
- **`server/`** — ASP.NET Core Web API acting as an aggregating backend-for-frontend.
  It resolves SWAPI's URL-linked records (homeworld, species, films, starships,
  vehicles) into a single enriched DTO per character, cached in memory since the
  upstream data is static.

## Getting started

```bash
npm install
npm run dev
```

This starts the backend (`http://localhost:5251`) and the frontend (Vite dev server)
together. The Vite dev server proxies `/api` requests to the backend, so the browser
sees everything as same-origin.

## Testing

```bash
npm --prefix client test        # Vitest + React Testing Library
npm --prefix client run typecheck
npm --prefix client run lint
dotnet test server/StarWars.sln # xUnit + Moq + FluentAssertions
```
