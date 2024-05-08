import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';

type MenuItem = Required<MenuProps>['items'][number];

interface ISiderMenu {
  items: MenuItem[];
  collapsed: boolean;
  // eslint-disable-next-line no-unused-vars
  setCollapsed: (value: boolean) => void;
}

export const SiderMenuComponent: React.FC<ISiderMenu> = ({ items, collapsed, setCollapsed }) => {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
  );
};
