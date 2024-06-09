import { MENU_ITEMS } from "@/utils/constans/menuConstant";

import { SideMenuProps } from "@/utils/types/sidermenu";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

export default function SiderMenuComponent({
  collapsed,
  setCollapsed,
}: SideMenuProps) {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        paddingTop: 20,
        zIndex: 100,
      }}>
      <Menu theme="dark" mode="inline" items={MENU_ITEMS} />
    </Sider>
  );
}
