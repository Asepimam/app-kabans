"use client";
import { createClient } from "@/utils/supabase/client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, type FormProps, Input } from "antd";
import Link from "next/link";
import { z } from "zod";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { SiIbm } from "react-icons/si";
export type FormLoginType = {
  email: string;
  password: string;
  remember: boolean;
};

export const RegisterForm = () => {
  const emailSchema = z.string().email("Invalid email address");
  const supabase = createClient();
  const validateEmail = (value: string) => {
    try {
      emailSchema.parse(value);
      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error.errors[0].message);
    }
  };
  const onFinish: FormProps<FormLoginType>["onFinish"] = async (
    value: FormLoginType,
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email: value.email,
      password: value.password,
    });
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
  };

  const loginGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
  };
  const loginGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}>
      <Form.Item
        hasFeedback
        name="email"
        rules={[
          {
            validator: (rule, value) => validateEmail(value),
          },
        ]}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
          size="middle"
        />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="password"
        rules={[
          {
            validator: (rule, value) => {
              if (!value) {
                return Promise.reject("Please input your Password!");
              }
              if (value.length < 8) {
                return Promise.reject("Password must be at least 8 characters");
              }
              if (!/[A-Z]/.test(value)) {
                return Promise.reject(
                  "Password must include at least one capital letter",
                );
              }
              if (!/[a-z]/.test(value)) {
                return Promise.reject(
                  "Password must include at least one lowercase letter",
                );
              }
              if (!/[0-9]/.test(value)) {
                return Promise.reject(
                  "Password must include at least one number",
                );
              }
              if (!/[!@#$%^&*]/.test(value)) {
                return Promise.reject(
                  "Password must include at least one special character",
                );
              }

              return Promise.resolve();
            },
          },
        ]}>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          size="middle"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          block
          style={{
            marginBottom: 10,
          }}>
          Sign Up
        </Button>
        Or <Link href="/login">"Login!"</Link>
      </Form.Item>
      <div className="flex items-center justify-between gap-4 px-10">
        <Button onClick={loginGoogle}>
          <FaGoogle className="text-[25px]" />
        </Button>
        <Button onClick={loginGithub}>
          <FaGithub className="text-[25px]" />
        </Button>
        <Button onClick={loginGithub}>
          <SiIbm className="text-[25px]" />
        </Button>
      </div>
    </Form>
  );
};
