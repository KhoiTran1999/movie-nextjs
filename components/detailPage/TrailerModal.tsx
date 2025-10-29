'use client';

import { MovieDetailType } from '@/types';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { Suspense, useState } from 'react';
import ReactPlayer from 'react-player/youtube';

interface TrailerModalPage {
  movieDetail: MovieDetailType;
}

export const TrailerModal = (props: TrailerModalPage) => {
  const { movieDetail } = props;

  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState<boolean>(false);

  const handleOpenTrailerModal = () => {
    setIsTrailerModalOpen(true);
  };

  const handleCancelTrailer = () => {
    setIsTrailerModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpenTrailerModal}
        className="mr-3 h-10 w-[121px] rounded-md bg-[#b2afaf2e] px-1 text-white transition-colors hover:bg-[#adaaaa64]"
      >
        <InfoCircleOutlined />
        <span className="ml-3">Trailer</span>
      </button>{' '}
      <Modal
        open={isTrailerModalOpen}
        centered
        width={'70svw'}
        footer={null}
        styles={{ body: { paddingTop: '20px', paddingBottom: '10px' } }}
        onCancel={handleCancelTrailer}
        destroyOnClose={!isTrailerModalOpen}
      >
        <div className="h-[30svh] sm:h-[70svh]">
          <Suspense fallback={<p>Loading video...</p>}>
            <ReactPlayer
              url={movieDetail.trailer}
              playing
              controls
              loop
              width={'100%'}
              height={'100%'}
              style={{ backgroundColor: 'black' }}
              id="iframeTrailerVideo"
            />
          </Suspense>
        </div>
      </Modal>
    </div>
  );
};
