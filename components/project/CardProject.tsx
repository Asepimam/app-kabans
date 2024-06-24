// "use client";

import { ProjectCardProps } from "@/utils/types/project";
import { CopyOutlined } from "@ant-design/icons";
import { Button, Card, message, Tooltip } from "antd";
import Link from "next/link";

const { Meta } = Card;

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { project_name, descriptions, slug, code_invite } = project;
  const loading = false;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success("Invite code copied to clipboard!");
    } catch (err) {
      message.error("Failed to copy invite code");
    }
  };

  return (
    <Link href={`/dashboard/projects/${slug}`}>
      <Card
        style={{ width: 300, margin: "1rem" }}
        hoverable={true}
        loading={loading}>
        <Meta
          title={project_name}
          description={
            <>
              <p>{descriptions ? descriptions : "your project"}</p>
              {code_invite && (
                <div style={{ marginTop: "1rem" }}>
                  <Tooltip title="Click to copy invite code">
                    <Button
                      icon={<CopyOutlined />}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent Link navigation
                        handleCopy(code_invite);
                      }}>
                      {code_invite}
                    </Button>
                  </Tooltip>
                </div>
              )}
            </>
          }
        />
      </Card>
    </Link>
  );
};

export { ProjectCard };
