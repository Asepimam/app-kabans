import { useTasks } from "@/utils/contexts/tasksContext";
import { Task } from "@/utils/types/task";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";

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

  // useEffect(() => {
  //   if (task && !create) {
  //     form.setFieldsValue({
  //       name: task.title,
  //       dateTime: [dayjs(task.start_task), dayjs(task.end_task)],
  //       description: task.descriptions,
  //     });
  //   }
  // }, [task, create, form]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    // reset form menjadi kosong
    form.resetFields();
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
      };

      if (create) {
        await createTask(taskData);
      } else if (task) {
        await updateTask(task.id, taskData);
      }

      onClose();
    } catch (errorInfo) {
      console.error("Failed to submit form:", errorInfo);
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
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
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
        </Form>
      </Drawer>
    </>
  );
};

export default TaskDrawer;
