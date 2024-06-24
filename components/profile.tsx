"use client";

import { createClient } from "@/utils/supabase/client";
import { Button, DatePicker, Form, Input, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";

const supabase = createClient();

export default function EditProfile() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          message.error("Error fetching profile.");
        } else {
          form.setFieldsValue({
            firstName: data.first_name,
            lastName: data.last_name,
            fullName: data.full_name,
            birthDate: dayjs(data.birth_date),
          });
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, [form]);

  const handleFinish = async (values: any) => {
    const { firstName, lastName, fullName, birthDate } = values;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      const updates = {
        first_name: firstName,
        last_name: lastName,
        full_name: fullName,
        birth_date: dayjs(birthDate).format("YYYY-MM-DD"),
      };

      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error updating profile:", error);
        message.error("Error updating profile.");
      } else {
        message.success("Profile updated successfully.");
      }
    }
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="flex flex-col w-[600px] rounded-md bg-gray-800 p-16">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="flex flex-col space-y-4">
        <div className="flex">
          <div className="flex-1">
            <Form.Item
              name="firstName"
              label={
                <span className="text-lg font-semibold text-gray-200">
                  First Name
                </span>
              }>
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label={
                <span className="text-lg font-semibold text-gray-200">
                  Last Name
                </span>
              }>
              <Input />
            </Form.Item>
            <Form.Item
              name="fullName"
              label={
                <span className="text-lg font-semibold text-gray-200">
                  Full Name
                </span>
              }>
              <Input />
            </Form.Item>
            <Form.Item
              name="birthDate"
              label={
                <span className="text-lg font-semibold text-gray-200">
                  Date of Birth
                </span>
              }>
              <DatePicker />
            </Form.Item>
          </div>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Edit Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
