export type ProjectType = {
    id: string;
    project_name: string;
    descriptions: string;
    slug: string;
    code_invite: string;
  };
  
export type ProjectCardProps = {
    project: ProjectType;
}



export type ProjectListProps =  {
    projects: ProjectType[];
    loadingState: boolean;
    width?: string;
  }