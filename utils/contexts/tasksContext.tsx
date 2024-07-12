"use client";
import { createClient } from "@/utils/supabase/client";
import { Task } from "@/utils/types/task";
import React, { createContext, useCallback, useContext, useState } from "react";

const TasksContext = createContext<{
  tasks: Task[];
  fetchTasks: () => void;
  updateTaskStage: (id: string, stageId: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  createTask: (task: any) => void;
  userId: string;
}>({
  tasks: [],
  fetchTasks: () => {},
  createTask: () => {},
  updateTask: () => {},
  updateTaskStage: () => {},
  deleteTask: () => {},
  userId: "",
});

interface TaskProviderProps {
  children: React.ReactNode;
  idUser: string;
}

export const TasksProvider = ({ children, idUser }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const supabase = createClient();

  const fetchTasks = useCallback(async () => {
    const { data: tasks, error } = await supabase.from("tasks").select("*");
    if (error) {
      console.error("Error fetching tasks: ", error);
    } else {
      setTasks(tasks);
    }
  }, [supabase]);

  const updateTaskStage = useCallback(
    async (id: string, stageId: string) => {
      const { data, error } = await supabase
        .from("tasks")
        .update({ stage_id: stageId })
        .eq("id", id);

      if (error) {
        console.error("Error updating task stage: ", error);
      } else {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, stage_id: stageId } : task,
          ),
        );
      }
    },
    [supabase],
  );
  const createTask = useCallback(
    async (task: Task) => {
      const { data, error } = await supabase.from("tasks").insert([task]);

      if (error) {
        console.error("Error creating task: ", error);
      } else {
        fetchTasks();
      }
    },
    [supabase, fetchTasks],
  );

  const updateTask = useCallback(
    async (id: string, updatedTask: Partial<Task>) => {
      const { data, error } = await supabase
        .from("tasks")
        .update(updatedTask)
        .eq("id", id);

      if (error) {
        console.error("Error updating task: ", error);
      } else {
        fetchTasks();
      }
    },
    [supabase, fetchTasks],
  );

  const deleteTask = useCallback(
    async (id: string) => {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) {
        console.error("Error deleting task: ", error);
      } else {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      }
    },
    [supabase],
  );

  return (
    <TasksContext.Provider
      value={{
        tasks,
        fetchTasks,
        updateTaskStage,
        deleteTask,
        createTask,
        updateTask,
        userId: idUser,
      }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
