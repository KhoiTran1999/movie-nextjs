'use server';

import { MovieType } from '@/types';
import { Button, Result } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import CardMovie from '../homePage/cardSlider/CardMovieClient';

interface FeatureMovieList {
  initialRecommendedMovie: MovieType[];
  totalItems: number;
  current: string;
  featureId: string;
  page: number;
}

interface TileType {
  title: string;
}

export const Tile = ({ title }: TileType) => (
  <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-500 bg-clip-text py-3 text-center text-4xl font-bold text-transparent md:text-7xl">
    {title}
  </h1>
);

const FeatureMovieList = async (props: FeatureMovieList) => {
  const { initialRecommendedMovie, totalItems, current, featureId, page } = props;

  return (
    <>
      <div className="mb-5 mt-14 animate-opacityAnimated px-4">
        <Tile title={current} />
        {initialRecommendedMovie?.length ? (
          <div className="mt-[20px]">
            <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
              {initialRecommendedMovie.map((val: MovieType, idx: number) => (
                <div key={idx}>
                  <CardMovie
                    englishName={val.englishName}
                    vietnamName={val.vietnamName}
                    movieId={val.movieId}
                    thumbnail={val.thumbnail}
                    time={val.time}
                    totalEpisodes={val.totalEpisodes}
                    totalSeasons={val.totalSeasons}
                  />
                </div>
              ))}
            </div>
            <div className="mr-5 flex items-center justify-end">
              <Button
                disabled={page === 1}
                href={`/feature?current=${current}&featureId=${featureId}&page=${page - 1}`}
                type="text"
              >
                <div>
                  <LeftOutlined />
                </div>
              </Button>
              <span className="mx-5">
                {page} / {totalItems}
              </span>
              <Button
                disabled={page === totalItems}
                href={`/feature?current=${current}&featureId=${featureId}&page=${page + 1}`}
                type="text"
              >
                <div>
                  <RightOutlined />
                </div>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Result
              status="error"
              title="Something went wrong"
              subTitle="Please wait a few minutes"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FeatureMovieList;
