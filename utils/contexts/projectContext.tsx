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

interface TeamProject {
  id: string;
  code_invite: string;
  project_id: string;
}

interface TeamProjectMember {
  team_project: TeamProject;
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

export const ProjectProvider: React.FC<{
  children: ReactNode;
  sub: string;
}> = ({ children, sub }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async (query?: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      let profileCondition = {};
      if (user) {
        profileCondition = { user_id: user.id };
      } else {
        profileCondition = { uniq_id: sub };
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select()
        .match(profileCondition)
        .single();
      if (profileError) throw profileError;

      // gunakan interface TeamProject untuk mendapatkan data team_project
      const { data: teamProjects, error: teamProjectsError } = await supabase
        .from("team_project_members")
        .select<"team_project(id, code_invite, project_id)", TeamProjectMember>(
          "team_project(id, code_invite, project_id)",
        )
        .eq("user_id", profile.id);
      if (teamProjectsError) throw teamProjectsError;

      const projectIds = teamProjects?.map(
        (teamProject) => teamProject.team_project.project_id,
      );
      const { data: projects, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .in("id", projectIds);
      if (projectsError) throw projectsError;

      const result = projects.map((project) => {
        const teamProject = teamProjects?.find(
          (teamProject) => teamProject.team_project.project_id === project.id,
        );
        return {
          ...project,
          code_invite: teamProject?.team_project.code_invite,
        };
      });

      setProjects(result);
    } catch (error) {
      console.error("Error fetching projects: ", error);
      // Handle error appropriately, e.g., set an error state or show a message
    }
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

      let profileCondition: any = {};
      if (user) {
        profileCondition = { user_id: user.id };
      } else {
        profileCondition = { uniq_id: sub };
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select()
        .match(profileCondition)
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
      let profileCondition: any = {};
      if (user) {
        profileCondition = { user_id: user.id };
      } else {
        profileCondition = { uniq_id: sub };
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select()
        .match(profileCondition)
        .single();
      if (profileError) throw profileError;

      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .insert([{ project_name: title, descriptions }])
        .select()
        .single();
      if (projectError) throw projectError;

      const { data: team } = await supabase
        .from("team_project")
        .insert([{ code_invite: codeInvite(), project_id: projectData.id }])
        .select()
        .single();

      await supabase.from("team_project_members").insert([
        {
          team_project_id: team.id,
          user_id: profile.id,
          role: "owner",
        },
      ]);

      const stages = ["To Do", "In Progress", "Review", "Done"].map(
        (stage_name) => ({
          project_id: projectData.id,
          stage_name,
        }),
      );
      await supabase.from("stages").insert(stages);

      message.success("Project created successfully");
      fetchProjects();
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
