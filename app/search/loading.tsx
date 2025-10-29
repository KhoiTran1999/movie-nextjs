import NavigationMovie from '@/components/homePage/navigationMovie/NavigationMovie';
import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="m-auto mt-14 w-full max-w-[700px]">
      <NavigationMovie />
      <Spin spinning={true} size="large" fullscreen />
    </div>
  );
}
