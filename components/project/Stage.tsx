import { StageProps } from "@/utils/types/stege";
import { Task } from "@/utils/types/task";
import { useMemo } from "react";
import CardTask from "../CardTask";
import { Droppable } from "../Dropable";
import TaskDrawer from "../TaskDrawer";

const Stage = ({ stageName, tasks, id_stage, onHandleDelete }: StageProps) => {
  // const columnIdentifier = useMemo(() => _.camel(stageName), [stageName]);
  console.log("tasks", tasks);

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
      <div
        className={`flex flex-col ${bgColorClass} rounded-lg shadow-lg m-2 w-80`}>
        <div className="flex flex-row justify-between items-center bg-zinc-400 p-2 sticky top-0 h-20">
          <h1 className=" text-gray-800">{stageName}</h1>
          <p className="text-gray-800">{amounts}</p>
        </div>
        <div className="flex flew-col justify-between items-center p-2 min-h-[500px]">
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
