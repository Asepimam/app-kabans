"use client";
import SiderMenuComponent from "@/components/SideMenu";
import { Layout } from "antd";
const { Content } = Layout;
export default function TemplateDasboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiderMenuComponent />
      <Layout
        style={{
          backgroundColor: "transparent",
          marginLeft: 30,
          transition: "margin-left 0.3s",
        }}>
        <Content>{children}</Content>
      </Layout>
    </>
  );
}
