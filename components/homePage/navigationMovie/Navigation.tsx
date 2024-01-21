import { usePathname } from "next/navigation";
import { Menu } from "antd";

import { homeItems } from "@/constant/homeItem";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <Menu
      items={homeItems}
      mode="horizontal"
      selectedKeys={[pathname]}
      style={{
        fontWeight: 600,
        fontSize: 16,
        backgroundColor: "transparent",
      }}
    />
  );
};

export default Navigation;
