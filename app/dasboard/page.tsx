"use client";
import { ProjectList } from "@/components/dasboard/project-list";
import ModalCreateProject from "@/components/project/Modal";
import { WrapperItems } from "@/components/wrapper-items";
import { createClient } from "@/utils/supabase/client";
import { Typography } from "antd";
import { useEffect, useState } from "react";

const { Title } = Typography;

export default function Dasboard() {
  const [project, setProjects]: any = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetch, setFetch] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase.from("projects").select("*");
      if (error) {
        console.error(error);
        return;
      }
      setProjects(data);
      setFetch(false);
    };
    fetchProjects();

    setInterval(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <div className="flex flex-col p-5">
      <h3 className="text-slate-200 m-4 text-2xl capitalize  font-semibold">
        dasboard
      </h3>
      {fetch ? (
        <div className="flex flex-col items-center justify-center w-full h-96 text-slate-200 text-4xl">
          Loading...
        </div>
      ) : project && project.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-96">
          <h3 className="text-2xl font-semibold text-zinc-800">
            Selemat datang di dasboard
          </h3>
          <h4 className="text-lg font-semibold text-zinc-800">
            Silahkan buat project baru
          </h4>
          <ModalCreateProject />
        </div>
      ) : (
        <div className="flex flex-row w-full mx-4 gap-5">
          <ProjectList projects={project} loadingState={loading} />
          <div className="flex flex-col w-1/2">
            <WrapperItems>
              <Title level={3}>Projects</Title>
              <Title level={3}>Projects</Title>
              <Title level={3}>Projects</Title>
              <Title level={3}>Projects</Title>
            </WrapperItems>
            <WrapperItems>
              <Title level={3}>Projects</Title>
              <Title level={3}>Projects</Title>
              <Title level={3}>Projects</Title>
              <Title level={3}>Projects</Title>
            </WrapperItems>
          </div>
        </div>
      )}
    </div>
  );
}
