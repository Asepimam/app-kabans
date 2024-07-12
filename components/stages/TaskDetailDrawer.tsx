"use client";

import { Task } from "@/utils/types/task";

import { Col, Drawer, Row } from "antd";
import React from "react";
import FormDetailTask from "./FormDetailTask";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

export interface TaskDetailProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  taskDetail: Task;
}

export default function TaskDetail({
  children,
  open,
  onClose,
  taskDetail,
}: TaskDetailProps) {
  return (
    <>
      <div>{children}</div>
      <Drawer width={720} onClose={onClose} open={open}>
        <FormDetailTask taskDetail={taskDetail} />
        <Row gutter={16}>
          <Col span={24}>
            <Messages task={taskDetail} drawerOpen={open} />
            <SendMessage task={taskDetail} drawerOpen={open} />
          </Col>
        </Row>
      </Drawer>
    </>
  );
}
