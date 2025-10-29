'use client';

import { revalidatePathAction } from '@/components/actions';
import { homeItems } from '@/constant/homeItem';
import { setIsLoadingFeature } from '@/utils/redux/slices/toggle/IsLoadingFeatureSlice ';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';

interface homeItemProps {
  href: string;
  name: string;
  code: string;
}

const NavigationFeature = (props: any) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const pathname = usePathname();

  let page = searchParams.get('current');
  if (!page) {
    if (!pathname.includes('detail')) page = 'Home';
  }

  const handleChangeRoute = async () => {
    await revalidatePathAction('feature');
  };

  const handleOnClick = () => {
    dispatch(setIsLoadingFeature(true));
  };

  return (
    <div className="flex items-center justify-center">
      {homeItems?.map((val: homeItemProps, idx: number) => {
        return (
          <Link href={val.href} key={idx} onClick={handleOnClick}>
            <div
              onClick={handleChangeRoute}
              className={`mr-4 border-b-2 border-transparent font-semibold transition-colors hover:border-b-[#ffffff8c] ${val.code === page && 'border-b-red-600'}`}
            >
              {val.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default NavigationFeature;
