"use client";
import { useProject } from "@/utils/contexts/projectContext";
import { ProjectCard } from "./CardProject";

export default function ProjectList() {
  const { projects } = useProject();

  return (
    <div className="flex w-full gap-3 flex-wrap ml-28">
      {projects &&
        projects.map((item: any) => (
          <ProjectCard project={item} key={item.id} />
        ))}
    </div>
  );
}
