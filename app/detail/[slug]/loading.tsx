import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";
import { Spin } from "antd";

export default function Loading() {
  return (
    <div>
      <NavigationMovie />
      <Spin spinning={true} size="large" fullscreen />
    </div>
  );
}
