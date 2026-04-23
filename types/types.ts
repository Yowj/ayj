export interface AnimeInfo {
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

export interface Episode {
  name?: string; // optional, hindi lahat may name
  link: string;
}

export interface LocalDetails {
  _id: number;
  name: string;
  link: string;
  title?: string; // optional, wala sa example na ito
  poster?: string; // optional, wala sa example na ito
  type: string;
  ep: Episode[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  finder: string;
}

export interface AnimeDetailsResponse {
  local: LocalDetails;
}


export interface AniListItem {
  _id: number;
  Name: string;
  ImagePath: string;
  MALScore: string;
  RatingsNum: number;
  DescripTion: string;
  finder: string;
}

export interface AniListResponse {
  currentPage: number;
  AniData: AniListItem[];
}

export interface WholePageResponse {
  currentPage: number;
  wholePage: AniListItem[];
}


