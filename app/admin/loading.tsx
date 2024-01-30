import Dashboard from "@/components/adminPage/content/Dashboard";
import HeaderAdmin from "@/components/adminPage/header/HeaderAdmin";
import SiderAdmin from "@/components/adminPage/sider/SiderAdmin";
import StyledComponentsRegistry from "@/lib/antd.registry";
import { Layout } from "antd";

const layoutStyle = {
  width: "100svw",
  height: "100svh",
};

export default function Loading() {
  return (
    <div>
      <Dashboard Upcoming={0} Pending={0} Release={0} Deleted={0} Account={0} />
    </div>
  );
}
