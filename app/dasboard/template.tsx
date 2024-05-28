"use client";
import { SiderMenuComponent } from "@/components/SideMenu";
import { Layout } from "antd";
import { useState } from "react";
const { Content } = Layout;
export default function TemplateDasboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
      <SiderMenuComponent collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout
        style={{
          backgroundColor: "transparent",
          marginLeft: collapsed ? 30 : 150,
          transition: "margin-left 0.3s",
        }}>
        <Content>{children}</Content>
      </Layout>
    </>
  );
}
