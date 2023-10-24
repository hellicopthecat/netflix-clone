const API_KEY = "659fcb8c58aae2c9fa0ee430456f44bd";
const BASE_URL = "https://api.themoviedb.org/3/";

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface IGetMovieResult {
  datas: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_page: number;
  total_results: number;
}

export function getMovies() {
  return fetch(
    `${BASE_URL}movie/now_playing?language=ko&region=kr&api_key=${API_KEY}`
  ).then((res) => res.json());
}
