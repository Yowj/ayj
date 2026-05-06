# AYJ

Anime streaming web app built with Next.js 16 App Router. Pulls data from the AniPub API, enriched with Jikan (MyAnimeList) metadata.

## Stack

- **Next.js 16** — App Router, Server Components, server-side caching
- **React 19**
- **Tailwind CSS 4**
- **TypeScript 5**

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero carousel, Action & Romance grids, trending sidebar |
| `/anime/[id]` | Anime detail — synopsis, characters, episode list |
| `/anime/[id]/watch/[ep]` | Episode player |
| `/browse` | Full archive, paginated |
| `/genre/[slug]` | Anime by genre, paginated |

## Project Structure

```
app/
  page.tsx                    # Home
  anime/[id]/                 # Anime detail + watch
  browse/                     # Browse all
  genre/[slug]/               # Browse by genre
  api/
    anime/[id]/               # Anime info proxy
    search/                   # Search proxy
    proxy-image/              # Image proxy (CORS bypass)

components/
  Navbar.tsx                  # Sticky header with search
  WatchSection.tsx            # Episode player UI
  Pagination.tsx
  home/
    HeroCarousel.tsx
    AnimeCard.tsx
    AnimeGrid.tsx
    TrendingSidebar.tsx

lib/
  anipub.ts                   # All API calls + server-side caching

types/
  types.ts                    # TypeScript interfaces
```

## Data Sources

- **AniPub** (`anipub.xyz`) — primary source for anime list, episode streams, and basic info
- **Jikan** — enriched metadata (synopsis, characters, images) fetched via AniPub's details endpoint

TEST