"use client";
import { formatTimeDifference } from "@/utils/helpers/expired";
import { Task } from "@/utils/types/task";
import { useDraggable } from "@dnd-kit/core";
import { useCallback, useMemo, useState } from "react";
import TaskDetail from "./TaskDetail";

interface CardTaskProps {
  task: Task;
}

const CardTask = ({ task }: CardTaskProps) => {
  const { id, title, start_task, end_task } = task;
  const [open, setOpen] = useState(false);

  const expireTask = formatTimeDifference(end_task, start_task);

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

  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((event: any) => {
    setStartPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const handleMouseUp = useCallback(
    (event: any) => {
      const endPosition = { x: event.clientX, y: event.clientY };
      const distance = Math.sqrt(
        Math.pow(endPosition.x - startPosition.x, 2) +
          Math.pow(endPosition.y - startPosition.y, 2),
      );

      if (distance < 5) {
        onClickCard();
      }
    },
    [startPosition, id],
  );

  const onClickCard = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = (values: any) => {
    console.log(values);
    setOpen(false);
  };

  return (
    <>
      <TaskDetail open={open} onClose={onClose} onSubmit={onSubmit}>
        <div
          style={style}
          className="bg-transparent w-full h-full cursor-pointer"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          ref={setNodeRef}
          {...attributes}
          {...listeners}>
          <div className="flex flex-col bg-white shadow-lg rounded-lg p-4 min-h-[96px] mt-3">
            <div className="flex flex-col content-center">
              <p className="text-lg text-gray-800 font-semibold">{title}</p>
              <div className="flex gap-2">
                <p className="text-sm text-gray-500">Expired:</p>
                <p className="text-sm text-gray-800">{expireTask}</p>
              </div>
            </div>
          </div>
        </div>
      </TaskDetail>
    </>
  );
};

export default CardTask;
