export interface FullAnimeInfoResponse {
  local: {
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
  };
  jikan: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
      webp: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
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
    titles: {
      type: string;
      title: string;
    }[];
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
    producers: {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }[];
    licensors: unknown[];
    studios: {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }[];
    genres: {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }[];
    explicit_genres: unknown[];
    themes: {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }[];
    demographics: unknown[];
  };
  characters: {
    character: {
      mal_id: number;
      url: string;
      images: {
        jpg: { image_url: string };
        webp: {
          image_url: string;
          small_image_url: string;
        };
      };
      name: string;
    };
    role: "Main" | "Supporting";
    favorites: number;
    voice_actors: {
      person: {
        mal_id: number;
        url: string;
        images: {
          jpg: { image_url: string };
        };
        name: string;
      };
      language: string;
    }[];
  }[];
}
