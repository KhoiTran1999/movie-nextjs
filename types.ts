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