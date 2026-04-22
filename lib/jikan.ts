import type { AniListItem, AniListResponse, AnimeInfo, WholePageResponse } from './types'

const BASE = 'https://anipub.xyz'
const CACHE: RequestInit = { next: { revalidate: 3600 } }

// ─── Home ──────────────────────────────────────────────────────────────────────

export async function getAnimeInfo(idOrSlug: string | number): Promise<AnimeInfo> {
  const res = await fetch(`${BASE}/api/info/${idOrSlug}`, CACHE)
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
  const d = await res.json()
  return d.data
}

export async function getTopRated(page = 1): Promise<AniListResponse> {
  const data = await (await fetch(`${BASE}/api/findbyrating?page=${page}`, CACHE)).json()
  return data
}

export async function getRandomAnime(): Promise<AnimeInfo[]> {
  const MAX_ID = 500;
  const COUNT = 10;
  const results: AnimeInfo[] = [];
  const tried = new Set<number>();

  while (results.length < COUNT) {
    let id: number;
    do {
      id = Math.floor(Math.random() * MAX_ID) + 1;
    } while (tried.has(id));
    tried.add(id);

    try {
      const res = await fetch(`${BASE}/api/info/${id}`);
      if (!res.ok) continue;

      const d = await res.json() as AnimeInfo;
      const fix = (p?: string) =>
        p?.startsWith("https://") ? p : `${BASE}/${p}`;

      d.ImagePath = fix(d.ImagePath) ?? d.ImagePath;
      d.Cover = fix(d.Cover) ?? d.Cover;

      results.push(d);
    } catch {
      // skip
    }
  }

  return results;
}

