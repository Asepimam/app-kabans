"use client";
import ModalCreateProject from "@/components/project/Modal";
import ListProject from "@/components/project/ProjectList";
import SearchComponen from "@/components/Search";
import Skeleton from "@/components/Skeleton";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

const Project: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects]: any[] = useState([]);
  const supabase = createClient();
  useEffect(() => {
    const fetchProjects = async () => {
      const { data: projects, error } = await supabase
        .from("projects")
        .select("*");
      if (error) {
        console.error(error);
        return;
      }
      setProjects(projects);
    };
    fetchProjects();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  return (
    <>
      <div className="flex flex-row items-center w-full p-3">
        <ModalCreateProject />
        <div className="w-1/3 m-1.5">
          <SearchComponen />
        </div>
      </div>
      {loading ? <Skeleton /> : <ListProject projectsProps={projects} />}
    </>
  );
};
export default Project;
