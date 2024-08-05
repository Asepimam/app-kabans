import { MENU_ITEMS } from "@/utils/constans/menuConstant";

import { Layout, Menu } from "antd";
import Link from "next/link";

const { Sider } = Layout;

export default function SiderMenuComponent() {
  return (
    <Sider
      collapsed={false}
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
      <Link
        href={"/"}
        passHref
        className="
      text-2xl font-bold text-white text-center w-full block mb-4 hover:text-gray-300
      ">
        Kabans
      </Link>

      <Menu theme="dark" mode="inline" items={MENU_ITEMS} />
    </Sider>
  );
}
