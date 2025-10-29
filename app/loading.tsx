import NavigationMovie from '@/components/homePage/navigationMovie/NavigationMovie';
import { Spin } from 'antd';

export default function Loading() {
  return (
    <div>
      <NavigationMovie />
      <div className="flex h-screen w-screen items-center justify-center">
        <Spin spinning={true} size="large" />
      </div>
    </div>
  );
}
