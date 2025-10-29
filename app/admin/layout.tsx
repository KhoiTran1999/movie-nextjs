import HeaderAdmin from '@/components/adminPage/header/HeaderAdmin';
import SiderAdmin from '@/components/adminPage/sider/SiderAdmin';
import StyledComponentsRegistry from '@/lib/antd.registry';
import { Layout } from 'antd';

const layoutStyle = {
  width: '100svw',
  height: '100svh',
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <StyledComponentsRegistry>
          <Layout style={layoutStyle}>
            <SiderAdmin />
            <Layout>
              <HeaderAdmin />
              <div className="h-full w-full overflow-y-auto bg-[#001529] p-8">{children}</div>
            </Layout>
          </Layout>
        </StyledComponentsRegistry>
      </div>
    </>
  );
}
