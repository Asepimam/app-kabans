"use client";

import { useTasks } from "@/utils/contexts/tasksContext";
import { createClient } from "@/utils/supabase/client";
import { Task } from "@/utils/types/task";
import { Card } from "antd";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  profile_id: string;
  message: string;
  created_at: string;
  profiles: Profile;
}

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
}
type MessagesProps = {
  task: Task;
  drawerOpen: boolean;
};
const { Meta } = Card;
export default function Messages({ task, drawerOpen }: MessagesProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { userId } = useTasks();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload: any) => {
          setMessages((prevMessages: any) => [...prevMessages, payload.new]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [messages]);

  useEffect(() => {
    if (!isUserScrolling && drawerOpen) {
      scrollToBottom();
    }
  }, [messages]);

  const fetchMessages = async () => {
    const { data: messages, error } = await supabase
      .from("messages")
      .select(`*,profiles(id,full_name,avatar_url)`)
      .eq("task_id", task.id)
      .order("created_at", { ascending: true });
    if (error) {
      console.error("Failed to fetch messages:", error);
    } else {
      setMessages(messages);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        messagesContainerRef.current;
      if (scrollHeight - scrollTop === clientHeight) {
        setIsUserScrolling(false);
      } else {
        setIsUserScrolling(true);
      }
    }
  };

  return (
    <>
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        style={{
          marginBottom: 16,
          maxHeight: "200px",
          overflowY: "auto",
          border: "1px solid #f0f0f0",
          borderRadius: "10px",
        }}>
        {messages.map((msg: Message) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent:
                msg.profile_id === userId ? "flex-end" : "flex-start",
              padding: 10,
              gap: 10,
            }}>
            <img
              className="w-8 h-8 rounded-full"
              src={
                msg.profiles?.avatar_url
                  ? msg.profiles?.avatar_url
                  : "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
              }
              alt="avatar"
            />
            <div
              className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 ${
                msg.profile_id == userId ? "bg-gray-100" : "bg-gray-200"
              } rounded-e-xl rounded-es-xl 
               ${
                 msg.profile_id == userId
                   ? "dark:bg-gray-800"
                   : "dark:bg-cyan-700"
               }`}>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {msg.profiles?.full_name}
                </span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {new Date(msg.created_at).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                {msg.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
