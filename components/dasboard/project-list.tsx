"use client";
import { ProjectListProps } from "@/utils/types/project";
import { Card, Col, Row } from "antd";
import { ProjectCard } from "../project/CardProject";

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  loadingState,
  width = "900px",
}) => {
  return (
    <Card
      style={{
        width: width,
        height: "540px",
        overflow: "auto",
      }}>
      <Row justify={"space-evenly"} gutter={[8, 24]}>
        {projects.map((project) => (
          <Col key={project.id}>
            <ProjectCard project={project} loading={loadingState} />
          </Col>
        ))}
      </Row>
    </Card>
  );
};
