"use client";

import InviteCode from "@/components/project/InviteCode";
import ModalCreateProject from "@/components/project/ModalCreateProject";
import ProjectList from "@/components/project/ProjectList";
import { ProjectProvider } from "@/utils/contexts/projectContext";

export default function Page() {
  return (
    <ProjectProvider>
      <div className="flex items-center bg-gray-800 -ml-5 p-3 justify-between mb-3">
        <ModalCreateProject />
        <InviteCode />
      </div>
      <ProjectList />
    </ProjectProvider>
  );
}
