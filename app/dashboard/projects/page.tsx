import InviteCode from "@/components/project/InviteCode";
import ModalCreateProject from "@/components/project/ModalCreateProject";
import ProjectList from "@/components/project/ProjectList";
import { ProjectProvider } from "@/utils/contexts/projectContext";
import { setUpOIDC } from "@/utils/openid/client";

import { cookies } from "next/headers";

export default async function Page() {
  const token = cookies().get("token")?.value;
  const client = await setUpOIDC();
  let sub: string;

  if (token) {
    const result = await client.userinfo(token!);
    sub = result.sub;
  }

  return (
    <ProjectProvider sub={sub!}>
      <div className="flex items-center bg-gray-800 -ml-5 p-3 justify-between mb-3">
        <ModalCreateProject />
        <InviteCode />
      </div>
      <ProjectList />
    </ProjectProvider>
  );
}
