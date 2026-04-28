import type {
  AnimeBasicInfo,
  AnimeListItem,
  AnimeListResponse,
  AnimeListResponseWithDetails,
  AnimePageResponse,
  AnimeDetailsResponse,
  AnimeStreamingInfo,
  AniSearchResult,
} from "@/types/types";

const BASE = "https://anipub.xyz";
const CACHE: RequestInit = { next: { revalidate: 3600 } };

// ─── Helpers ───────────────────────────────────────────────────────────────────

const fixImagePath = (path: string) => {
  if (path.startsWith("https://")) return path;
  return `/api/proxy-image?url=${encodeURIComponent(`${BASE}/${path}`)}`;
};

/**
 * Tries each URL in order (HEAD request), returns the first accessible one.
 * Falls back to `primary` if all fail.
 */
async function resolveImagePath(primary: string, fallbacks: string[]): Promise<string> {
  const candidates = [primary, ...fallbacks].filter(Boolean);

  for (const url of candidates) {
    try {
      const res = await fetch(url, { method: "HEAD", cache: "no-store" });
      if (res.ok) return url;
    } catch {
      // try next candidate
    }
  }

  // last resort — return original even if broken
  return primary;
}

// ─── Home ───────────────────────────────────────────────────────────────────

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

export async function searchAnime(q: string): Promise<AniSearchResult[]> {
  const res = await fetch(`${BASE}/api/search/${encodeURIComponent(q)}`);
  if (!res.ok) return [];
  const data = await res.json();
  const items: AniSearchResult[] = Array.isArray(data) ? data : (data.results ?? data.data ?? []);
  return items.map((item) => ({
    ...item,
    Image: item.Image?.startsWith("https://") ? item.Image : `${BASE}/${item.Image}`,
  }));
}

export async function getStreamingInfo(id: string | number): Promise<AnimeStreamingInfo | null> {
  const res = await fetch(`${BASE}/v1/api/details/${id}`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  const data = await res.json();
  return data.local ?? null;
}

export async function getTopRated(page = 1): Promise<AnimeListResponseWithDetails> {
  const res = await fetch(`${BASE}/api/findbyrating?page=${page}`, CACHE);

  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

  const data: AnimeListResponse = await res.json();

  const enriched = await Promise.all(
    data.AniData.map(async (item) => {
      const details = await getAnimeDetails(item._id);

      const primaryImage = item.ImagePath ? fixImagePath(item.ImagePath) : "";
      const fallbackImages = [
        details?.local?.Cover ? fixImagePath(details.local.Cover) : "",
        details?.jikan?.images?.jpg?.large_image_url ?? "",
        details?.jikan?.images?.jpg?.image_url ?? "",
      ].filter(Boolean);

      const resolvedImage = await resolveImagePath(primaryImage, fallbackImages);

      return {
        ...item,
        ImagePath: resolvedImage,
        details,
      };
    }),
  );

  return {
    currentPage: data.currentPage,
    AniData: enriched,
  };
}

export async function findByGenre(genre: string, page = 1): Promise<AnimeListItem[]> {
  const res = await fetch(`${BASE}/api/findbyGenre/${genre}?Page=${page}`, CACHE);

  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

  const data: AnimePageResponse = await res.json();

  return data.wholePage.map((item) => ({
    ...item,
    ImagePath: item.ImagePath ? fixImagePath(item.ImagePath) : item.ImagePath,
  }));
}

export async function getAnimeTotal(): Promise<number> {
  const res = await fetch("https://anipub.xyz/api/getAll", CACHE);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json();
}

export async function getAnimeByPage(page = 1): Promise<AnimeBasicInfo[]> {
  const COUNT = 20;
  const ids = Array.from({ length: COUNT }, (_, i) => (page - 1) * COUNT + i + 1);

  const results = await Promise.all(
    ids.map(async (id) => {
      try {
        const res = await fetch(`${BASE}/api/info/${id}`, CACHE);
        if (!res.ok) return null;
        const anime = (await res.json()) as AnimeBasicInfo;
        const fixUrl = (p?: string) => (!p ? p : p.startsWith("https://") ? p : `${BASE}/${p}`);
        anime.ImagePath = fixUrl(anime.ImagePath) ?? anime.ImagePath;
        anime.Cover = fixUrl(anime.Cover) ?? anime.Cover;
        return anime;
      } catch {
        return null;
      }
    }),
  );

  return results.filter((a): a is AnimeBasicInfo => a !== null);
}
