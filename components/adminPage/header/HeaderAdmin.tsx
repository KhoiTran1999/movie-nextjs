'use client';

import { Layout, Tooltip, Badge } from 'antd';
import { MenuOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { toggleSider } from '@/utils/redux/slices/toggle/IsToggleSiderSlice';
import { useState } from 'react';

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  backgroundColor: '#001529',
  height: '50px',
  padding: '0px 20px',
};

const HeaderAdmin = () => {
  const dispatch = useDispatch();
  const [rotated, setRotated] = useState(false);

  const handleToggleSider = () => {
    dispatch(toggleSider());
    setRotated(!rotated); // đảo trạng thái quay
  };
  return (
    <Header style={headerStyle}>
      <div className="flex h-full w-full items-center justify-between">
        <div className="flex h-full w-full items-center">
          <MenuOutlined
            style={{
              fontSize: '20px',
              color: 'red',
              cursor: 'pointer',
              padding: '8px',
              transition: 'transform 0.5s ease',
              transform: rotated ? 'rotate(270deg)' : 'rotate(0deg)', // xoay khi true
            }}
            onClick={handleToggleSider}
          />
        </div>
        <div className="flex items-center">
          <Tooltip title="information">
            <Badge count={5} offset={[-5, 7]} style={{ cursor: 'pointer' }}>
              <i
                className="fa-light fa-bell"
                style={{
                  fontSize: '20px',
                  color: 'grey',
                  padding: '8px',
                  cursor: 'pointer',
                }}
              ></i>
            </Badge>
          </Tooltip>

          <Tooltip title="Logout">
            <i
              className="fa-regular fa-right-from-bracket"
              style={{
                fontSize: '20px',
                color: 'grey',
                cursor: 'pointer',
                padding: '8px',
                marginLeft: '15px',
              }}
            ></i>
          </Tooltip>
        </div>
      </div>
    </Header>
  );
};

export default HeaderAdmin;
