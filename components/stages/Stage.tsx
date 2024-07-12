"use client";

import { StageProps } from "@/utils/types/stege";

import { Task } from "@/utils/types/task";
import { useMemo } from "react";
import { Droppable } from "../Dropable";
import CardTask from "./CardTask";
import TaskDrawer from "./TaskDrawer";

const Stage = ({ stageName, tasks, id_stage, onHandleDelete }: StageProps) => {
  const amounts = useMemo(
    () => tasks?.filter((elm) => elm.stage_id === id_stage).length,
    [tasks, id_stage],
  );
  let bgColorClass = "";
  switch (stageName) {
    case "To Do":
      bgColorClass = "bg-[#443C68]";
      break;
    case "In Progress":
      bgColorClass = "bg-[#393053]";
      break;
    case "Review":
      bgColorClass = "bg-[#0A2647]";
      break;
    case "Done":
      bgColorClass = "bg-[#144272]";
      break;
    default:
      bgColorClass = "bg-gray-400";
      break;
  }

  return (
    <div className="flex flex-col items-center" key={`column-${id_stage}`}>
      <div className={`flex flex-col rounded-lg shadow-lg m-2 min-w-[250px]`}>
        <div
          className={`flex ${bgColorClass} flex-row justify-between items-center  p-2 sticky top-0 h-20`}>
          <h1 className=" text-gray-300">{stageName}</h1>
          <p className="text-gray-400">{amounts}</p>
        </div>
        <div className="flex flex-col justify-between items-center px-4 h-auto border-dashed border-2">
          <Droppable id={id_stage}>
            {tasks?.map((task: Task) => (
              <CardTask key={`draggable-element-${task.id}`} task={task} />
            ))}
          </Droppable>
        </div>
      </div>
      <TaskDrawer create={true} id_stage={id_stage} />
    </div>
  );
};
export default Stage;
