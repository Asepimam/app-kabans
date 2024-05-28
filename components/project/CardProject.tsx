// "use client";

import { ProjectCardProps } from "@/utils/types/project";
import { Card } from "antd";
import Link from "next/link";

const { Meta } = Card;

const ProjectCard: React.FC<ProjectCardProps> = ({ project, loading }) => {
  const { project_name, description, slug } = project;

  return (
    <Link href={`/dasboard/projects/${slug}`}>
      <Card style={{ width: 300 }} hoverable={true} loading={loading}>
        <Meta
          title={project_name}
          description={description ? description : "your project"}
        />
      </Card>
    </Link>
  );
};

export { ProjectCard };
