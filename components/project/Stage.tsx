import { createClient } from "@/utils/supabase/server";
import { StageProps } from "@/utils/types/stege";
import { Droppable } from "../Dropable";
import Taks from "./Taks";

const Stage = async ({ props }: { props: StageProps }) => {
  const { stage_name, count, id } = props;
  const supabase = createClient();

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("stage_id", id);

  const countTask: number = tasks?.length ?? 0;
  let bgColorClass = "";
  switch (stage_name) {
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
    <>
      <div
        className={`flex flex-col ${bgColorClass} rounded-lg shadow-lg m-2 w-80 h-[560px]`}>
        <div className="flex flex-row justify-between items-center bg-zinc-400 p-2 m-2">
          <h1 className=" text-gray-800">{stage_name}</h1>
          <p className="text-gray-800">{countTask}</p>
        </div>
        <div className="flex flew-col justify-between items-center p-2">
          <Droppable id={id}>
            {tasks?.map((task) => (
              <Taks key={task.id} props={task} />
            ))}
          </Droppable>
        </div>
      </div>
    </>
  );
};
export default Stage;
