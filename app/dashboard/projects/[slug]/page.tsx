"use client";
import StagesKanbans from "@/components/project/StagesKanbans";
import { TasksProvider } from "@/utils/contexts/tasksContext";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <TasksProvider>
        <StagesKanbans slug={params.slug} />
      </TasksProvider>
    </>
  );
}
