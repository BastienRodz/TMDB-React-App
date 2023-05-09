export interface Movie {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
  genres: number;
  adult: boolean;
}

export interface Genre {
  id: number;
  name: string;
}
export interface detailedMovie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | object;
  budget: number;
  genres: Array<Genre>;
  homepage: string | null;
  id: number;
  idmb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: Array<object>;
  production_countries: Array<object>;
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: Array<object>;
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
