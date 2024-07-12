"use client";
import { useTasks } from "@/utils/contexts/tasksContext";
import { createClient } from "@/utils/supabase/client";
import { stage } from "@/utils/types/stege";
import { Task } from "@/utils/types/task";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useCallback, useEffect, useState } from "react";
import Stage from "./Stage";

const StagesKanbans = ({ slug }: { slug: string }) => {
  const supabase = createClient();
  const [stages, setStages] = useState<stage[] | null>([]);
  const { tasks, fetchTasks, updateTaskStage } = useTasks();

  useEffect(() => {
    const fetchStages = async () => {
      const { data: project } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug);

      if (project?.length) {
        const { data: stages } = await supabase
          .from("stages")
          .select("*")
          .eq("project_id", project[0].id);
        setStages(stages);
      }
    };
    fetchStages();
  }, [slug, supabase]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOnDragEnd = useCallback(
    async ({ active, over }: DragEndEvent) => {
      const elementId: string = active.id.toString();
      const newStageId: string = over?.id as string;

      if (!newStageId || !tasks) return;
      await updateTaskStage(elementId, newStageId);
    },
    [tasks, supabase],
  );

  return (
    <DndContext onDragEnd={handleOnDragEnd}>
      <div className="flex justify-stretch">
        {stages?.map((stage) => (
          <Stage
            id_stage={stage.id}
            key={`column-${stage.stage_name}`}
            stageName={stage.stage_name}
            tasks={
              tasks?.filter((task: Task) => task.stage_id === stage.id) || []
            }
          />
        ))}
      </div>
    </DndContext>
  );
};

export default StagesKanbans;
