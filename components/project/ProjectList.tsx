"use client";
import { useState } from "react";
import { ProjectCard } from "./CardProject";

export default function ListProject({
  projectsProps,
}: {
  projectsProps: any[];
}) {
  const [projects, setProjects]: any = useState(projectsProps);
  return (
    <div className="flex flex-col justify-start">
      {projects && projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-96">
          <h4 className="text-2xl text-slate-200">No project found</h4>
        </div>
      ) : null}
      {projects &&
        projects.map((item: any) => (
          <div key={item.id} className="flex flex-col p-3">
            <ProjectCard project={item} />
          </div>
        ))}
    </div>
  );
}
