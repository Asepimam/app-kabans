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
import React from "react";

const { Option } = Select;

export type Users = {
  user: string;
  id: string;
};
export default function TaskDetail({
  children,
  open,
  onClose,
  onSubmit,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
}) {
  const [form] = Form.useForm();

  return (
    <>
      <div>{children}</div>
      <Drawer
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
}
