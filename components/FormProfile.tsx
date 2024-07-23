"use client";
import { createClient } from "@/utils/supabase/client";
import { Button, Col, DatePicker, Form, Input, message, Row } from "antd";
import dayjs from "dayjs";
import { redirect } from "next/navigation";
import { useState } from "react";
import UploadAvatarProfile from "./UploadAvatarProfile";
export type FormProfileProps = {
  first_name: string;
  last_name: string;
  full_name: string;
  birth_date: string;
  subUser: string;
  avatar_url: string;
};

export default function FormProfile(props: FormProfileProps) {
  const supabase = createClient();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [form] = Form.useForm();
  form.setFieldsValue({
    firstName: props.first_name,
    lastName: props.last_name,
    fullName: props.full_name,
    birthDate: props.birth_date ? dayjs(props.birth_date) : null,
  });

  const handleFinish = async (values: any) => {
    const { firstName, lastName, fullName, birthDate } = values;
    let profileMatch = {};

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (props.subUser) {
      profileMatch = { uniq_id: props.subUser };
    } else {
      if (session) {
        profileMatch = { user_id: session.user.id };
      } else {
        return redirect("/");
      }
    }

    if (profileMatch) {
      const updates = {
        first_name: firstName,
        last_name: lastName,
        full_name: fullName,
        birth_date: dayjs(birthDate).format("YYYY-MM-DD"),
        avatar_url: imageUrl,
      };
      const { data, error } = await supabase
        .from("profiles")
        .update(updates!)
        .match(profileMatch)
        .select();
      console.log(data);
      if (error) {
        console.error("Error updating profile:", error);
        message.error("Error updating profile.");
      } else {
        message.success("Profile updated successfully.");
      }
    }
  };

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }
    const fileName = file.name;
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(`public/profile_avatar/${fileName}`, file);
    if (error) {
      console.error("Error uploading file: ", error);
      message.error("Error uploading file.");
      return;
    }
    const url = await supabase.storage
      .from("uploads")
      .getPublicUrl(`public/profile_avatar/${fileName}`);
    setImageUrl(url.data.publicUrl);
  };

  const handleRemoveUpload = async () => {
    const pathArray = imageUrl!.split("/");

    const relevantPath = pathArray?.[10];

    const { error } = await supabase.storage
      .from("uploads")
      .remove([`public/profile_avatar/${relevantPath}`]);
    if (error) {
      console.error("Error removing file: ", error);
      message.error("Error removing file.");
      return;
    }
    setImageUrl(null);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex w-full max-w-[800px] rounded-md bg-gray-800 p-8">
        <div className="flex flex-col items-center mr-8">
          <UploadAvatarProfile
            onChange={handleFileUpload}
            imageUrl={imageUrl!}
            initialImageUrl={props.avatar_url}
            onRemove={handleRemoveUpload}
          />
        </div>
        <div className="flex flex-col flex-1">
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="firstName"
                  label={
                    <span className="text-lg font-semibold text-gray-200">
                      First Name
                    </span>
                  }>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastName"
                  label={
                    <span className="text-lg font-semibold text-gray-200">
                      Last Name
                    </span>
                  }>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
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
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Edit Profile
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
