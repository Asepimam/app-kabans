"use client";
import { Task } from "@/utils/types/task";
import { CopyOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, message, Row } from "antd";
import dayjs from "dayjs";

const FormDetailTask = ({ taskDetail }: { taskDetail: Task }) => {
  const [form] = Form.useForm();
  const copyToClipboard = (e: any) => {
    navigator.clipboard.writeText(e.target.value).then(
      () => {
        message.success("URL copied to clipboard");
      },
      () => {
        message.error("Failed to copy URL");
      },
    );
  };

  form.setFieldsValue({
    name: taskDetail.title,
    dateTime: [dayjs(taskDetail.start_task), dayjs(taskDetail.end_task)],
    description: taskDetail.descriptions,
    url: taskDetail.url,
  });
  return (
    <Form layout="vertical" form={form} hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="name" label="Task">
            <Input placeholder="Please enter task name" disabled />
          </Form.Item>
        </Col>
        {taskDetail.url && (
          <Col span={12}>
            <Form.Item name="url" label="Url">
              <Input
                style={{ width: "100%" }}
                addonBefore="http://"
                placeholder="Please enter url"
                disabled
              />
              <Button icon={<CopyOutlined />} onClick={copyToClipboard} />
            </Form.Item>
          </Col>
        )}
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="dateTime"
            label="Expired Task"
            rules={[{ required: true, message: "Please choose the dateTime" }]}>
            <DatePicker.RangePicker
              style={{ width: "100%" }}
              showTime
              getPopupContainer={(trigger) => trigger.parentElement!}
              disabled
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="description" label="Description of Task">
            <Input.TextArea
              rows={4}
              placeholder="Please enter task description"
              disabled
            />
          </Form.Item>
        </Col>
      </Row>
      {taskDetail.image && (
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="image" label="Detail Image">
              <img
                src={taskDetail.image}
                alt="uploaded"
                style={{ width: "100%", marginTop: 16 }}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export default FormDetailTask;
