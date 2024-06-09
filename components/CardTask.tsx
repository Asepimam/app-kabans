"use client";
import { formatTimeDifference } from "@/utils/helpers/expired";
import { Task } from "@/utils/types/task";
import { useDraggable } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import DeleteTask from "./DeleteTask";
import TaskDrawer from "./TaskDrawer";

interface CardTaskProps {
  task: Task;
}

const CardTask = ({ task }: CardTaskProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { id, title, start_task, end_task } = task;

  const expireTask = formatTimeDifference(start_task, end_task);
  console.log(expireTask);

  const itemIdentifier = useMemo(() => id, [id]);
  const { transform, attributes, listeners, setNodeRef } = useDraggable({
    id: itemIdentifier,
  });
  const style = useMemo(() => {
    if (transform) {
      return {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      };
    }
    return undefined;
  }, [transform]);

  return (
    <>
      <div className="flex flex-col bg-white shadow-lg rounded-lg p-4 min-h-[180px] mt-3">
        <div
          style={style}
          className="h-6 bg-transparent w-full"
          ref={setNodeRef}
          {...attributes}
          {...listeners}></div>
        <div className="flex items-center m-5">
          <div className="flex flex-col">
            <p className="text-lg text-gray-800 font-semibold">{title}</p>
            <div className="flex items-center justify-center">
              <p className="text-sm text-gray-500">Expire Date:</p>
              <p className="text-sm text-gray-800 ml-2">{expireTask}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-5 px-5">
          <div className="flex items-center">
            <TaskDrawer create={false} task={task} />
          </div>
          <div className="border-l border-gray-400 h-6 mx-3"></div>
          <div className="flex items-center">
            <DeleteTask id={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTask;
