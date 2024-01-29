export interface CategoryType {
  categoryId: number;
  name: string;
}

export interface FeatureType {
  featureId: number;
  name: string;
}

export interface MovieType {
  categories: CategoryType[];
  dateCreated: string;
  englishName: string;
  feature: FeatureType;
  mark: number;
  movieId: string;
  status: string;
  thumbnail: string;
  time: number;
  totalEpisodes: number;
  totalSeasons: number;
  vietnamName: string;
}

export interface MovieAntdTableType {
  movieId: React.Key;
  thumbnail: string;
  englishName: string;
  time: number;
  mark: number;
  status: string;
  feature: string;
  categories: string[];
  dateCreated: string;
}

export interface EpisodeType {
  episodeId: string;
  episodeNumber: number,
  name: number;
  video: string;
  dateCreated: string;
  dateUpdated: string;
}

export interface SeasonType {
  seasonId: string;
  seasonNumber: number;
  name: string;
  episodes: EpisodeType[]
}

export interface castCharacteryType {
  personId: string;
  namePerson: string;
  characterName: string;
  thumbnail: string
}

export interface nationType {
  nationId: number;
  name: string;
}

export interface MovieDetailType {
  castCharacteries: castCharacteryType[];
  categories: CategoryType[];
  producedDate: string;
  dateUpdated: string;
  description: string;
  englishName: string;
  feature: FeatureType;
  mark: number;
  movieId: string;
  nation: nationType;
  thumbnail: string;
  time: number;
  status: string;
  totalEpisodes: number;
  totalSeasons: number;
  trailer: string;
  vietnamName: string;
  viewer: number;
}

export interface SeasonMovieDetail {
  seasonId: string;
  seasonNumber: number;
  name: string;
  episodes: EpisodeMovieDetail[];
}

export interface EpisodeMovieDetail {
  episodeId: string;
  episodeNumber: number;
  name: string;
  video: string;
  dateCreated: string;
  dateUpdated: string;
}