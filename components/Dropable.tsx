"use client";
import { useDroppable } from "@dnd-kit/core";
import { useMemo } from "react";

export interface IDropable {
  id: string;
  children: React.ReactNode;
}

export const Droppable: React.FC<IDropable> = ({ children, id }) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = useMemo(
    () => ({
      opacity: isOver ? 0.5 : 1,
    }),
    [isOver],
  );

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        height: "100%",
        width: "100%",
      }}>
      {children}
    </div>
  );
};
