import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Metadata } from 'next';
import React from 'react';
import TemplateDasboard from '../template';
export const metadata: Metadata = {
  title: 'Project',
  description: 'Project Page',
};
const ProjectLayout = ({ children }: { children: React.ReactNode }) => (
  <TemplateDasboard>
    <AntdRegistry>{children}</AntdRegistry>
  </TemplateDasboard>
);

export default ProjectLayout;
