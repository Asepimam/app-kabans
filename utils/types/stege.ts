import { Task } from "./task";

export type stage = {
    stage_name: string;
    count: number;
    id: string;
};
export type StageProps = {
    stageName:  string;
    id_stage: string;
    tasks?: Task[]|null;
    onHandleDelete?: () => void;
};
