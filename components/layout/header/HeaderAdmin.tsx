import { Layout, Tooltip, Badge } from "antd";
import { MenuOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleSider } from "@/utils/redux/slices/toggle/IsToggleSiderSlice";

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  backgroundColor: "#001529",
  height: "50px",
  padding: "0px 20px",
};

const HeaderAdmin = () => {
  const dispatch = useDispatch();

  const handleToggleSider = () => {
    dispatch(toggleSider());
  };
  return (
    <Header style={headerStyle}>
      <div className="w-full h-full flex justify-between items-center">
        <div className="w-full h-full flex items-center">
          <MenuOutlined
            style={{
              fontSize: "20px",
              color: "red",
              cursor: "pointer",
              padding: "8px",
            }}
            onClick={handleToggleSider}
          />
        </div>
        <div className="flex items-center">
          <Tooltip title="information">
            <Badge count={5} offset={[-5, 7]} style={{ cursor: "pointer" }}>
              <i
                className="fa-light fa-bell"
                style={{
                  fontSize: "20px",
                  color: "grey",
                  padding: "8px",
                  cursor: "pointer",
                }}
              ></i>
            </Badge>
          </Tooltip>

          <Tooltip title="Logout">
            <i
              className="fa-regular fa-right-from-bracket"
              style={{
                fontSize: "20px",
                color: "grey",
                cursor: "pointer",
                padding: "8px",
                marginLeft: "15px",
              }}
            ></i>
          </Tooltip>
        </div>
      </div>
    </Header>
  );
};

export default HeaderAdmin;
