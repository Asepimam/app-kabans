"use client";
import { useProject } from "@/utils/contexts/projectContext";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import React, { useState } from "react";

const { Search } = Input;

const SearchComponent: React.FC = () => {
  const { projects, fetchProjects } = useProject();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setSearchQuery(value);
    fetchProjects(value);
  };

  return (
    <div>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <div>
        {projects.length > 0 ? (
          <ul>
            {projects.map((project) => (
              <li key={project.id}>{project.project_name}</li>
            ))}
          </ul>
        ) : (
          searchQuery !== "" && <p>No projects found</p>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
