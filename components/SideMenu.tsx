import { MENU_ITEMS } from "@/utils/constans/menuConstant";
import { SideMenuProps } from "@/utils/types/sidermenu";
import { Avatar, Layout, Menu } from "antd";

const { Sider } = Layout;

import { FaRegUser } from "react-icons/fa";

export const SiderMenuComponent: React.FC<SideMenuProps> = ({
  collapsed,
  setCollapsed,
}) => {
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
      <Avatar
        style={{
          marginLeft: 15,
        }}
        icon={<FaRegUser />}
        size={{ xs: 24, sm: 32, md: 40, lg: 45, xl: 45 }}
      />
      <Menu theme="dark" mode="inline" items={MENU_ITEMS} />
    </Sider>
  );
};
