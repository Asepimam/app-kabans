import { AntdRegistry } from "@ant-design/nextjs-registry";
import TemplateDasboard from "./template";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TemplateDasboard>
      <AntdRegistry>{children}</AntdRegistry>
    </TemplateDasboard>
  );
}
