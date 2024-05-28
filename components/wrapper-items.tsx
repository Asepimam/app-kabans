import { Card } from 'antd';

export const WrapperItems = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card style={{ width: 400, height: 250, overflow: 'auto', marginBottom: 20 }}>{children}</Card>
  );
};
