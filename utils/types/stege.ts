export type StageProps = {
    stage_name: string;
    count: number;
    id: string;
};

export type StageKanbanProps = {
    stages: StageProps[];
};