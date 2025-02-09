export type MovieType = {
  adult: boolean;
  backdrop_path: string;
  original_title: string;
  genre_ids: Array<number>;
  id: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genres: string;
  directer: string;
  name: string;
  total_results: number;
  total_pages: number;
  titles_count: number;
  job: string;
};
export type genreType = {
  id: number;
  name: string;
  actors: string;
  stars: string;
};

export const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmZiMWY2ZTA2ZWI2YzE3MGJjZWI0ODUzMzY1MWJjZiIsIm5iZiI6MTczNzM0MjU0NS42MjQsInN1YiI6IjY3OGRiZTUxZDhhNWIwZDAwYzQzNGNmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dmDhnJpGWqwqyuPSu6Vaqv1Chq-b3BmRKojdw8AMHM4";
