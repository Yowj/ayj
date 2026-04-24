import type {
  AnimeBasicInfo,
  AnimeListItem,
  AnimeListResponse,
  AnimeListResponseWithDetails,
  AnimePageResponse,
  AnimeDetailsResponse,
} from "@/types/types";

const BASE = "https://anipub.xyz";
const CACHE: RequestInit = { next: { revalidate: 3600 } };

// ─── Home ──────────────────────────────────────────────────────────────────────

export async function getAnimeInfo(idOrSlug: string | number): Promise<AnimeBasicInfo> {
  const res = await fetch(`${BASE}/api/info/${idOrSlug}`, CACHE);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json();
}

export async function getAnimeDetails(id: number): Promise<AnimeDetailsResponse> {
  const res = await fetch(`${BASE}/anime/api/details/${id}`, CACHE);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json();
}

export async function getTopRated(page = 1): Promise<AnimeListResponseWithDetails> {
  const data: AnimeListResponse = await (
    await fetch(`${BASE}/api/findbyrating?page=${page}`, CACHE)
  ).json();

  const enriched = await Promise.all(
    data.AniData.map(async (item) => ({
      ...item,
      details: await getAnimeDetails(item._id),
    }))
  );

  return {
    currentPage: data.currentPage,
    AniData: enriched,
  };
}

export async function findByGenre(genre: string, page = 1): Promise<AnimeListItem[]> {
  const data: AnimePageResponse = await (
    await fetch(`${BASE}/api/findbyGenre/${genre}?Page=${page}`, CACHE)
  ).json();

  const fixImagePath = (path?: string) => {
    const full = path?.startsWith("https://") ? path : `${BASE}/${path}`;
    return `/api/proxy-image?url=${encodeURIComponent(full)}`;
  };

  return data.wholePage.map((item) => ({
    ...item,
    ImagePath: item.ImagePath ? fixImagePath(item.ImagePath) : item.ImagePath,
  }));
}

export async function getRandomAnime(): Promise<AnimeBasicInfo[]> {
  const MAX_ID = 500;
  const COUNT = 10;
  const results: AnimeBasicInfo[] = [];
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

      const anime = (await res.json()) as AnimeBasicInfo;
      const fixUrl = (p?: string) => (p?.startsWith("https://") ? p : `${BASE}/${p}`);

      anime.ImagePath = fixUrl(anime.ImagePath) ?? anime.ImagePath;
      anime.Cover = fixUrl(anime.Cover) ?? anime.Cover;

      results.push(anime);
    } catch {
      // skip failed fetches
    }
  }

  return results;
}