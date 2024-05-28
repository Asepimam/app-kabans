"use client";
import { useDraggable } from "@dnd-kit/core";
import React, { useMemo } from "react";

export interface IDraggable {
  id: string;
  children: React.ReactNode;
}

export const Draggable: React.FC<IDraggable> = ({ id, children }) => {
  const { transform, attributes, listeners, setNodeRef } = useDraggable({ id });

  const style = useMemo(() => {
    if (transform) {
      return {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      };
    }
    return undefined;
  }, [transform]);
  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners}>
      {children}
    </div>
  );
};
