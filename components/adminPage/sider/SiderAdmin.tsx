'use client';

import { Layout, Menu } from 'antd';
import { DeleteOutlined, HomeOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { isToggleSiderSelector } from '@/utils/redux/selector';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/public/logo';
import { Key } from '@/public/key';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  backgroundImage: 'linear-gradient(#001529, red)',
};

const SiderAdmin = () => {
  const isToggleSider = useSelector(isToggleSiderSelector);
  const pathname = usePathname();

  return (
    <Sider style={siderStyle} trigger={null} collapsible collapsed={isToggleSider}>
      <Link href={'/'}>
        <div className="flex items-center justify-center p-2">
          <Logo />
        </div>
      </Link>

      <Menu
        theme="dark"
        mode="inline"
        style={{ backgroundColor: 'transparent' }}
        defaultSelectedKeys={[pathname]}
        items={[
          {
            key: '/admin',
            icon: <HomeOutlined style={{ fontSize: '20px' }} />,
            label: <Link href={'/admin'}>Dashboard</Link>,
          },
          {
            key: '/admin/manageMovies',
            icon: <AppstoreAddOutlined style={{ fontSize: '20px' }} />,
            label: <Link href={'/admin/manageMovies'}>Manage Movies</Link>,
          },
          {
            key: '/admin/ManageGeminiKey',
            icon: <Key width={20} height={20} fill="#D1D0CF" />,
            label: <Link href={'/admin/manageGeminiKey'}>Manage GeminiKey</Link>,
          },
          {
            key: '/admin/trash',
            icon: <DeleteOutlined style={{ fontSize: '20px' }} />,
            label: <Link href={'/admin/trash'}>Trash</Link>,
          },
        ]}
      />
    </Sider>
  );
};

export default SiderAdmin;
