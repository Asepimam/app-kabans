"use client";
import { useDroppable } from "@dnd-kit/core";

export interface IDropable {
  id: string;
  children: React.ReactNode;
}

export const Droppable: React.FC<IDropable> = ({ children, id }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        minHeight: "500px",
        width: "100%",
      }}>
      {children}
    </div>
  );
};
