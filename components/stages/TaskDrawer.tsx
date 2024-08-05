import { useTasks } from "@/utils/contexts/tasksContext";
import { createClient } from "@/utils/supabase/client";
import { Task } from "@/utils/types/task";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
const { Option } = Select;

export type TaskDrawerProps = {
  create?: boolean;
  task?: Task;
  id_stage?: string;
};

export type Users = {
  user: string;
  id: string;
};
const TaskDrawer: React.FC<TaskDrawerProps> = ({ create, task, id_stage }) => {
  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState<Users[]>([]);
  const [form] = Form.useForm();
  const { createTask, updateTask } = useTasks();
  const [showMore, setShowMore] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const supabase = createClient();
  const showDrawer = () => {
    setOpen(true);
  };

  const deleteUpload = async () => {
    const pathArray = imageUrl?.split("/uploads/");
    const relevantPath = pathArray?.[1];
    await supabase.storage.from("uploads").remove([relevantPath!]);
    setImageUrl(null);
  };
  // set default true
  const onClose = () => {
    setOpen(false);
    form.resetFields();
    setShowMore(false);
  };
  const closeAndDeleteUpload = async (
    e: React.MouseEvent | React.KeyboardEvent,
  ) => {
    await deleteUpload();
    onClose();
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();

      const taskData = {
        title: values.name,
        descriptions: values.description,
        stage_id: id_stage!,
        start_task: dayjs(values.dateTime[0]).format("YYYY-MM-DD HH:mm:ss"),
        end_task: dayjs(values.dateTime[1]).format("YYYY-MM-DD HH:mm:ss"),
        image: imageUrl,
        url: values.url,
      };

      await createTask(taskData);

      onClose();
    } catch (errorInfo) {
      console.error("Failed to submit form:", errorInfo);
    }
  };

  const handleUpload = async (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const file = info.file.originFileObj;
      const rendomName = Math.random().toString(36).substring(7);
      const fileName = file.name + "_" + rendomName;
      const { data, error } = await supabase.storage
        .from("uploads")
        .upload(`public/${fileName}`, file);
      if (error) {
        console.error("Error uploading file: ", error);
        message.error("Error uploading file");
        return;
      } else {
        const url = await supabase.storage
          .from("uploads")
          .getPublicUrl(`public/${fileName}`);
        setImageUrl(url.data.publicUrl);
        message.success("File uploaded successfully");
      }
    }
  };

  return (
    <>
      <Button
        type={`primary`}
        onClick={showDrawer}
        shape={`round`}
        style={{
          width: `89px`,
          height: `40px`,
        }}>
        Create
      </Button>
      <Drawer
        title={create ? `Create a new task` : "Edit Task"}
        width={720}
        onClose={closeAndDeleteUpload}
        open={open}
        // bodyStyle={{
        //   paddingBottom: 80,
        // }}
        extra={
          <Space>
            <Button onClick={closeAndDeleteUpload}>Cancel</Button>
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }>
        <Form layout="vertical" form={form} hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter task name" }]}>
                <Input placeholder="Please enter task name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="url" label="Url">
                <Input
                  style={{ width: "100%" }}
                  addonBefore="http://"
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="Expired Task"
                rules={[
                  { required: true, message: "Please choose the dateTime" },
                ]}>
                <DatePicker.RangePicker
                  style={{ width: "100%" }}
                  showTime
                  getPopupContainer={(trigger) => trigger.parentElement!}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please enter task description",
                  },
                ]}>
                <Input.TextArea
                  rows={4}
                  placeholder="Please enter task description"
                />
              </Form.Item>
            </Col>
          </Row>
          {/* create more button */}
          <Button type="dashed" onClick={() => setShowMore(!showMore)}>
            More
          </Button>
          {showMore && (
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={24}>
                <Form.Item label="Upload Image">
                  <Upload
                    name="image"
                    listType="picture"
                    onChange={handleUpload}
                    onRemove={deleteUpload}>
                    <Button icon={<IoMdCloudUpload />}>Click to upload</Button>
                  </Upload>
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="uploaded"
                      style={{ width: "100%", marginTop: 16 }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form>
      </Drawer>
    </>
  );
};

export default TaskDrawer;
