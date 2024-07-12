"use client";

import { useTasks } from "@/utils/contexts/tasksContext";
import { createClient } from "@/utils/supabase/client";
import { Task } from "@/utils/types/task";
import { Button, Input, message } from "antd";
import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";

const { TextArea } = Input;
type SendMessageProps = {
  task: Task;
  drawerOpen: boolean;
};
export default function SendMessage({ task, drawerOpen }: SendMessageProps) {
  const { userId } = useTasks();
  const [newMessage, setNewMessage] = useState("");
  const supabase = createClient();

  const addMessage = async () => {
    if (newMessage.trim()) {
      const { data, error } = await supabase.from("messages").insert([
        {
          profile_id: userId,
          message: newMessage,
          task_id: task.id,
          stage_id: task.stage_id,
        },
      ]);

      if (error) {
        message.error("Failed to send message");
      } else {
        setNewMessage("");
      }
    }
  };
  useEffect(() => {
    if (drawerOpen) {
      setNewMessage("");
    }
  }, [drawerOpen]);

  return (
    <div className="relative flex items-end">
      <TextArea
        style={{
          paddingRight: "3rem",
        }}
        rows={10}
        placeholder="Add a comment or chat"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        autoSize={{ minRows: 2, maxRows: 6 }}
      />
      {newMessage.trim() && (
        <Button
          className="absolute right-9 bottom-2"
          type="primary"
          onClick={addMessage}
          icon={<IoMdSend />}
        />
      )}
    </div>
  );
}
