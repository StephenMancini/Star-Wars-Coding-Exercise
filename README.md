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

## Assumptions

- **swapi.info won't change.** It's a fixed snapshot covering only the original six films, not a live, growing dataset. Since it never adds new characters or films, its data can be cached and trusted indefinitely.
- **No database was needed.** Because the data never changes, there's no need to store it permanently. An in-memory cache is enough to avoid repeat calls to swapi.info, and it's fine if that cache resets on a server restart, since the same data can just be fetched again.
- **The app won't need to scale up or grow.** No future need was assumed for more users, more data, or more features. That's why simpler options were picked over more scalable ones, like an in-memory cache instead of a database, and a single backend instance instead of several.

## Technical Approach

The app is split into two pieces that talk to each other over HTTP. The backend (ASP.NET Core, C#) acts as a middleman between the frontend and swapi.info — swapi.info's data is spread across many small records linked by URLs (a character just points to its homeworld, films, etc. rather than including that data directly), so the backend's job is to fetch a character and all of its linked records, combine them into one clean object, and hand that single object to the frontend. It also caches everything it fetches in memory, since swapi.info's data never changes, so repeat requests don't need to hit the real API again.

The frontend (React + TypeScript) fetches the full character list once when the page loads, then filters that list instantly in the browser as the user types — no extra network requests per keystroke, since the whole list is small enough to filter locally.

The whole thing was built test-first: every piece of backend and frontend logic has a test written before the code that makes it pass, using xUnit/Moq on the backend and Vitest/React Testing Library on the frontend. There's also a CI pipeline (GitHub Actions) that runs all the tests, checks types and lint rules, and reports code quality/coverage to SonarCloud on every push.

## Known Limitations

- **No resilience against upstream failures.** If swapi.info is slow or unavailable, requests will hang or fail with no timeout, retry, or fallback — this path isn't tested or hardened.
- **Not production-hardened.** There's no authentication or rate limiting on the API, and CORS is hardcoded to the local dev frontend URL with no production configuration.
- **Frontend types are hand-maintained.** The TypeScript types mirror the backend's DTOs by hand instead of being generated from a shared schema, so they could silently drift out of sync if the API changed.

## How AI-assisted tools were used

- Claude Code CLI was used throughout the entire build — planning, implementation, testing, styling, debugging, and CI setup. Requirements were set, each phase was manually approved before moving to the next, and which suggestions and fixes to accept were manually chosen.
- Implementation followed strict test-driven development, with the assistant writing a failing test, then the minimal code to pass it, then committing — repeated for every piece of both the backend and frontend, per a plan agreed on in advance.
- A separate, independent AI review pass was run deliberately. A second agent instance, given no context from the rest of the build, was tasked with reviewing the whole repository fresh and reporting anything a first pass might have missed.