import { Layout, Menu, Button, theme } from "antd";
import {
  DeleteOutlined,
  HomeOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useSelector } from "react-redux";
import { isToggleSiderSelector } from "@/utils/redux/selector";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  backgroundImage: "linear-gradient(#001529, red)",
};

const SiderAdmin = () => {
  const isToggleSider = useSelector(isToggleSiderSelector);
  const pathname = usePathname();

  return (
    <Sider
      style={siderStyle}
      trigger={null}
      collapsible
      collapsed={isToggleSider}
    >
      <div className="flex justify-center items-center p-2">
        <Image src="/logo.png" alt="logo" width={100} height={50} />
      </div>

      <Menu
        theme="dark"
        mode="inline"
        style={{ backgroundColor: "transparent" }}
        defaultSelectedKeys={[pathname]}
        items={[
          {
            key: "/admin",
            icon: <HomeOutlined style={{ fontSize: "20px" }} />,
            label: <Link href={"/admin"}>Dashboard</Link>,
          },
          {
            key: "/admin/manageMovies",
            icon: <AppstoreAddOutlined style={{ fontSize: "20px" }} />,
            label: <Link href={"/admin/manageMovies"}>Manage Movies</Link>,
          },
          {
            key: "/admin/trash",
            icon: <DeleteOutlined style={{ fontSize: "20px" }} />,
            label: <Link href={"/admin/trash"}>Trash</Link>,
          },
        ]}
      />
    </Sider>
  );
};

export default SiderAdmin;
