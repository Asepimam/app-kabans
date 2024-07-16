"use client";

import { useTasks } from "@/utils/contexts/tasksContext";
import { createClient } from "@/utils/supabase/client";
import { Task } from "@/utils/types/task";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { Form, message } from "antd";
import { useEffect, useRef, useState } from "react";

type SendMessageProps = {
  task: Task;
  drawerOpen: boolean;
};

export default function SendMessage({ task, drawerOpen }: SendMessageProps) {
  const { userId } = useTasks();
  const [newMessage, setNewMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const [form] = Form.useForm();

  const addMessage = async () => {
    if (newMessage.trim()) {
      const { error } = await supabase.from("messages").insert([
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
      setShowPicker(false);
    }
  }, [drawerOpen]);

  const handleEmojiSelect = (e: any) => {
    const sym = e.unified.split("-");

    let codesArray: any = [];
    sym.forEach((el: any) => codesArray.push("0x" + el));

    let emoji = String.fromCodePoint(
      ...codesArray.map((code: string) => parseInt(code)),
    );
    setNewMessage(newMessage + emoji);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <Form form={form} onFinish={addMessage}>
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>

      <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 mt-2">
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke-width="2"
              d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
            />
          </svg>
          <span className="sr-only">Add emoji</span>
        </button>
        <textarea
          id="chat"
          rows={1}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="resize-none block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          placeholder="Your message..."
          required></textarea>
        <button
          type="submit"
          className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
          <svg
            className="w-5 h-5 rotate-90 rtl:-rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20">
            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
          </svg>
          <span className="sr-only">Send message</span>
        </button>
        {showPicker && (
          <div
            ref={pickerRef}
            style={{ position: "absolute", bottom: "60px", right: "10px" }}>
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              maxFrequentRows={0}
              previewPosition="none"
            />
          </div>
        )}
      </div>
    </Form>
  );
}
