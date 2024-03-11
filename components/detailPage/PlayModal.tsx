"use client";

import { MovieDetailType, MovieType, SeasonMovieDetail } from "@/types";
import { Modal, message } from "antd";
import { useState } from "react";
import { getSeasonListAction } from "../actions";
import { LoadingIcon } from "@/public/loading";
import { Play } from "@/public/play";
import { useDispatch } from "react-redux";
import { setMovieId } from "@/utils/redux/slices/data/movieIdSlice";
import WatchModal from "./watchModal/WatchModal";
import EpisodeModal from "./episodeModal/EpisodeModal";

interface PLayModalPage {
  movieDetail: MovieDetailType;
}

export const PLayModal = (props: PLayModalPage) => {
  const { movieDetail } = props;

  const dispatch = useDispatch();

  const [loadingMovie, setLoadingMovie] = useState<boolean>(false);
  const [isEpisodeModalOpen, setIsEpisodeModalOpen] = useState<boolean>(false);
  const [isWatchModalOpen, setIsWatchModalOpen] = useState<boolean>(false);
  const [watchMovie, setWatchMovie] = useState<SeasonMovieDetail>({
    seasonId: "",
    seasonNumber: 1,
    name: "",
    episodes: [
      {
        episodeId: "",
        episodeNumber: 1,
        name: "",
        video: "",
        dateCreated: "",
        dateUpdated: "",
      },
    ],
  });

  const showModal = async () => {
    setLoadingMovie(true);

    if (movieDetail.totalEpisodes > 1 && movieDetail.totalSeasons >= 1) {
      return setIsEpisodeModalOpen(true);
    }

    try {
      const data = await getSeasonListAction(movieDetail.movieId, 1, true);
      if (!data || data.length === 0) {
        setLoadingMovie(false);
        message.error("Movie is not ready!");
        return;
      }
      setWatchMovie({ ...data[0] });
      setLoadingMovie(false);
    } catch (error) {
      console.log(error);
      setLoadingMovie(false);
    }
    setIsWatchModalOpen(true);
    setLoadingMovie(false);
  };

  const handleCancelWatch = () => {
    setIsWatchModalOpen(false);
    dispatch(setMovieId(""));
  };

  const handleCancel = () => {
    setIsEpisodeModalOpen(false);
    dispatch(setMovieId(""));
  };

  return (
    <>
      <button
        onClick={showModal}
        className="mr-3 h-10 w-[121px] rounded-md bg-[red] px-1 text-white"
        disabled={movieDetail.totalSeasons === 0}
      >
        {movieDetail.totalSeasons > 0 ? (
          <>
            {loadingMovie ? (
              <div className="flex items-center justify-center">
                <LoadingIcon
                  width={20}
                  height={20}
                  fill="white"
                  className="mr-2 animate-spin"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Play width={20} height={20} fill="white" className="mr-2" />
                <span>Play</span>
              </div>
            )}
          </>
        ) : (
          <span>Upcoming...</span>
        )}
      </button>
      <Modal
        centered
        open={isEpisodeModalOpen}
        onCancel={handleCancel}
        footer={null}
        styles={{ body: { paddingTop: "20px", paddingBottom: "10px" } }}
      >
        <EpisodeModal
          movieId={movieDetail.movieId}
          totalSeasons={movieDetail.totalSeasons}
          englishName={movieDetail.englishName}
        />
      </Modal>
      <Modal
        open={isWatchModalOpen}
        centered
        width={"70svw"}
        onCancel={handleCancelWatch}
        footer={null}
        styles={{ body: { paddingTop: "20px", paddingBottom: "10px" } }}
        title={movieDetail.englishName}
        destroyOnClose={!isWatchModalOpen}
      >
        <WatchModal
          episodeNumber={watchMovie?.episodes[0]?.episodeNumber}
          seasonNumber={watchMovie?.seasonNumber}
          name={watchMovie?.episodes[0]?.name}
          video={watchMovie?.episodes[0]?.video}
          movieId={movieDetail.movieId}
        />
      </Modal>
    </>
  );
};
