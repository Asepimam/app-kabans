"use client";
import { codeInvite } from "@/utils/helpers/codeInvite";
import { createClient } from "@/utils/supabase/client";
import { message } from "antd";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const supabase = createClient();

interface Project {
  id: string;
  project_name: string;
  descriptions: string;
  code_invite: string;
}

interface ProjectContextType {
  projects: Project[];
  fetchProjects: (query?: string) => void;
  createProject: (title: string, descriptions: string) => Promise<void>;
  deleteProject: (id: string) => void;
  handleInviteCode: (inviteCode: string) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async (query?: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: profile } = await supabase
      .from("profiles")
      .select()
      .eq("user_id", user?.id)
      .single();

    const { data: teamMembers } = await supabase
      .from("team_project_members")
      .select()
      .eq("user_id", profile?.id);

    const teamProjectPromise =
      teamMembers?.map(async (teamMember: any) => {
        const { data: teamProject } = await supabase
          .from("team_project")
          .select()
          .eq("id", teamMember.team_project_id);
        return teamProject || [];
      }) ?? [];
    const teamProjectData = await Promise.all(teamProjectPromise);
    const teams = teamProjectData.flat();

    const projectPromise =
      teams?.map(async (team: any) => {
        const { data: project } = await supabase
          .from("projects")
          .select()
          .eq("id", team.project_id);
        return project || [];
      }) ?? [];

    const projectData = await Promise.all(projectPromise);

    const projects = projectData.flat();

    const data = projects.map((project: any) => {
      const codeInvite = teams.find(
        (team: any) => team.project_id === project.id,
      );
      return {
        id: project.id,
        project_name: project.project_name,
        descriptions: project.descriptions,
        slug: project.slug,
        code_invite: codeInvite?.code_invite,
      };
    });
    setProjects(data);
  };

  const handleInviteCode = async (inviteCode: string) => {
    try {
      const { data: teamProject, error } = await supabase
        .from("team_project")
        .select()
        .eq("code_invite", inviteCode)
        .single();

      if (error) {
        throw error;
      }

      if (!teamProject) {
        message.error("Invalid invite code");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        message.error("User not authenticated");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select()
        .eq("user_id", user?.id)
        .single();

      // jika user sudah join team dalam project yang sama maka tidak bisa join lagi
      const { data: teamMembers } = await supabase
        .from("team_project_members")
        .select()
        .eq("user_id", profile.id)
        .eq("team_project_id", teamProject.id);
      if (teamMembers!.length > 0) {
        message.error("You already joined this team");
        return;
      }

      const { error: insertError } = await supabase
        .from("team_project_members")
        .insert([
          {
            team_project_id: teamProject.id,
            user_id: profile.id,
            role: "member",
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      message.success("Successfully joined the team");
      fetchProjects(); // Fetch projects again to update the list
    } catch (error) {
      console.error("Error handling invite code: ", error);
      message.error("Error handling invite code");
    }
  };

  const createProject = async (title: string, descriptions: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select()
        .eq("user_id", user?.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .insert([
          {
            project_name: title,
            descriptions: descriptions,
          },
        ])
        .select()
        .single();

      if (projectError) {
        throw projectError;
      }
      const { data: team } = await supabase
        .from("team_project")
        .insert([
          {
            code_invite: codeInvite(),
            project_id: projectData.id,
          },
        ])
        .select()
        .single();
      await supabase.from("team_project_members").insert([
        {
          team_project_id: team.id,
          user_id: profile?.id,
          role: "owner",
        },
      ]);
      await supabase.from("stages").insert([
        { project_id: projectData.id, stage_name: "To Do" },
        { project_id: projectData.id, stage_name: "In Progress" },
        { project_id: projectData.id, stage_name: "Review" },
        { project_id: projectData.id, stage_name: "Done" },
      ]);

      message.success("Project created successfully");
      fetchProjects(); // Fetch projects again to update the list
    } catch (error) {
      console.error("Error creating project: ", error);
      message.error("Error creating project");
    }
  };

  useEffect(() => {
    fetchProjects();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  const deleteProject = async (id: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const {
        data: { profile },
      } = await supabase
        .from("profiles")
        .select()
        .eq("user_id", user?.id)
        .single();
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id)
        .eq("owner", profile.id);
      if (error) {
        throw error;
      }
      message.success("Project deleted successfully");
      fetchProjects(); // Fetch projects again to update the list
    } catch (error) {
      console.error("Error deleting project: ", error);
      message.error("Error deleting project");
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        fetchProjects,
        createProject,
        deleteProject,
        handleInviteCode,
        loading,
        setLoading,
      }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
