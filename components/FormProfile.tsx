"use client";
import { createClient } from "@/utils/supabase/client";
import { Button, DatePicker, Form, Input, message } from "antd";
import dayjs from "dayjs";
import { redirect } from "next/navigation";
export type FormProfileProps = {
  first_name: string;
  last_name: string;
  full_name: string;
  birth_date: string;
  subUser: string;
};

export default function FormProfile(props: FormProfileProps) {
  console.log(props);
  const supabase = createClient();

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

    console.log(profileMatch);
    if (profileMatch) {
      const updates = {
        first_name: firstName,
        last_name: lastName,
        full_name: fullName,
        birth_date: dayjs(birthDate).format("YYYY-MM-DD"),
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
