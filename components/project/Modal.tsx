"use client";
import { createClient } from "@/utils/supabase/client";
import { Button, Input, Modal } from "antd";
import React, { useRef, useState } from "react";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";

const { TextArea } = Input;

export default function ModalCreateProject() {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const draggleRef = useRef<HTMLDivElement>(null);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .insert([{ project_name: title, description }])
      .select();

    if (projectError) {
      console.error("Error inserting project: ", projectError);
      return;
    }
    console.log(projectData);

    const { error: stageError } = await supabase.from("stages").insert([
      { project_id: projectData[0].id, stage_name: "To Do" },
      { project_id: projectData[0].id, stage_name: "In Progress" },
      { project_id: projectData[0].id, stage_name: "Review" },
      { project_id: projectData[0].id, stage_name: "Done" },
    ]);

    if (stageError) {
      console.error("Error inserting stage: ", stageError);
      return;
    }

    setOpen(false);
    setTitle("");
    setDescription("");
  };
  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
    setTitle("");
    setDescription("");
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
      <Button onClick={showModal} className="m-2">
        Created
      </Button>
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Create New Project
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}>
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}>
        <Input
          placeholder="Project Name"
          style={{
            marginBottom: "1rem",
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description your project"
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </Modal>
    </>
  );
}
