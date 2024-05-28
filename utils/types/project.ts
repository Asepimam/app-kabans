export type ProjectType = {
    id: string;
    project_name: string;
    description: string;
    slug: string;
  };
  
export type ProjectCardProps = {
    project: ProjectType;
    loading?: boolean;
}



export type ProjectListProps =  {
    projects: ProjectType[];
    loadingState: boolean;
    width?: string;
  }