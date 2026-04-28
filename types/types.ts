// ─── /api/info/:id ────────────────────────────────────────────────────────────

export interface AnimeBasicInfo {
  _id: number;
  Name: string;
  ImagePath: string;
  Cover: string;
  Synonyms: string;
  Aired: string;
  Premiered: string;
  Duration: string;
  Status: string;
  MALScore: string;
  RatingsNum: number;
  Genres: string[];
  Studios: string;
  Producers: string;
  DescripTion: string;
  epCount: number;
}

// ─── /api/findbyrating · /api/findbyGenre ─────────────────────────────────────

export interface AnimeListItem {
  _id: number;
  Name: string;
  ImagePath: string;
  MALScore: string;
  RatingsNum: number;
  DescripTion: string;
  finder: string;
}

export interface AnimeListResponse {
  currentPage: number;
  AniData: AnimeListItem[];
}

export interface AnimePageResponse {
  currentPage: number;
  wholePage: AnimeListItem[];
}

// ─── /v1/api/details/:id (streaming) ─────────────────────────────────────────

export interface AnimeEpisode {
  name?: string;
  link: string;
}

export interface AnimeStreamingInfo {
  _id: number;
  name: string;
  link: string;
  title?: string;
  poster?: string;
  type: string;
  ep: AnimeEpisode[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  finder: string;
}

// ─── /anime/api/details/:id (full details) ────────────────────────────────────

export interface AnimeDetailsResponse {
  local: AnimeBasicInfo;
  jikan: AnimeJikanInfo;
  characters: AnimeCharacter[];
}

export interface AnimeJikanInfo {
  mal_id: number;
  url: string;
  images: {
    jpg: AnimeImageSet;
    webp: AnimeImageSet;
  };
  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
    images: {
      image_url: string | null;
      small_image_url: string | null;
      medium_image_url: string | null;
      large_image_url: string | null;
      maximum_image_url: string | null;
    };
  };
  approved: boolean;
  titles: { type: string; title: string }[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: {
    from: string;
    to: string;
    prop: {
      from: { day: number; month: number; year: number };
      to: { day: number; month: number; year: number };
    };
    string: string;
  };
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string;
  };
  producers: AnimeEntity[];
  licensors: unknown[];
  studios: AnimeEntity[];
  genres: AnimeEntity[];
  explicit_genres: unknown[];
  themes: AnimeEntity[];
  demographics: unknown[];
}

export interface AnimeImageSet {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface AnimeEntity {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface AnimeCharacter {
  character: {
    mal_id: number;
    url: string;
    images: {
      jpg: { image_url: string };
      webp: { image_url: string; small_image_url: string };
    };
    name: string;
  };
  role: "Main" | "Supporting";
  favorites: number;
  voice_actors: {
    person: {
      mal_id: number;
      url: string;
      images: { jpg: { image_url: string } };
      name: string;
    };
    language: string;
  }[];
}

// ─── /api/search/:q ───────────────────────────────────────────────────────────

export interface AniSearchResult {
  Name: string;
  Id: number;
  Image: string;
  finder: string;
}

// ─── Component types ──────────────────────────────────────────────────────────

// Minimal fields needed by AnimeCard/AnimeGrid — both AnimeListItem and AnimeBasicInfo satisfy this
export type AnimeCardData = Pick<AnimeListItem, "_id" | "Name" | "ImagePath" | "MALScore">;

// ─── Enriched list (getTopRated result) ───────────────────────────────────────

export interface AnimeListItemWithDetails extends AnimeListItem {
  details: AnimeDetailsResponse;
}

export interface AnimeListResponseWithDetails {
  currentPage: number;
  AniData: AnimeListItemWithDetails[];
}
