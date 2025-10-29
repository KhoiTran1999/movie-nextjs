'use client';

import { MovieDetailType } from '@/types';
import { Typography } from 'antd';
const { Paragraph } = Typography;

interface More {
  movieDetail: MovieDetailType;
}

export const More = (props: More) => {
  const { movieDetail } = props;
  return (
    <Paragraph
      ellipsis={{
        rows: 3,
        expandable: true,
        symbol: 'more',
      }}
    >
      {movieDetail.description}
    </Paragraph>
  );
};
