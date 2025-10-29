'use client';

import { addViewerMovieAction } from '@/components/actions';
import { useEffect } from 'react';

type movieProps = {
  seasonNumber: number;
  episodeNumber: number;
  name: string;
  video: string;
  movieId: string;
};

const WatchModal = ({ seasonNumber, episodeNumber, name, video, movieId }: movieProps) => {
  useEffect(() => {
    const fetchApi = async () => {
      try {
        await addViewerMovieAction(movieId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <div className="md:h-[70svh]">
      <iframe
        src={`https://drive.google.com/file/d/${video}/preview`}
        width="100%"
        height="100%"
        frameBorder="100"
        allowFullScreen
        title={`${name} - Episode ${episodeNumber} - Season ${seasonNumber}`}
        style={{ borderRadius: '10px' }}
        id="iframeVideo"
      ></iframe>
    </div>
  );
};

export default WatchModal;
