'use client';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import React from 'react';
import { z } from 'zod';

export type FormComponentProps = {
  onFinish: any;
  isSignUp: boolean;
};

export const FormComponent: React.FC<FormComponentProps> = ({ onFinish, isSignUp }) => {
  const emailSchema = z.string().email('Invalid email address');

  const validateEmail = (value: string) => {
    try {
      emailSchema.parse(value);
      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error.errors[0].message);
    }
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{
        width: '100%',
        maxWidth: 520,
        boxShadow: '0 12px 14px rgba(0,0,0,0.1)',
        padding: 25,
        margin: '0 40px',
      }}
    >
      <Form.Item
        hasFeedback
        name="email"
        rules={[
          {
            validator: (rule, value) => validateEmail(value),
          },
        ]}
      >
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
                return Promise.reject('Please input your Password!');
              }
              if (value.length < 8) {
                return Promise.reject('Password must be at least 8 characters');
              }
              if (!/[A-Z]/.test(value)) {
                return Promise.reject('Password must include at least one capital letter');
              }
              if (!/[a-z]/.test(value)) {
                return Promise.reject('Password must include at least one lowercase letter');
              }
              if (!/[0-9]/.test(value)) {
                return Promise.reject('Password must include at least one number');
              }
              if (!/[!@#$%^&*]/.test(value)) {
                return Promise.reject('Password must include at least one special character');
              }

              return Promise.resolve();
            },
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          size="middle"
        />
      </Form.Item>
      {isSignUp && (
        <Form.Item
          hasFeedback
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
            size="middle"
          />
        </Form.Item>
      )}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          block
          style={{
            marginBottom: 10,
          }}
        >
          {isSignUp ? 'Sign Up' : 'Log in'}
        </Button>
        Or{' '}
        <Link href={isSignUp ? '/auth/login' : '/auth/signup'}>
          {isSignUp ? 'Log in now!' : 'Register now!'}
        </Link>
      </Form.Item>
      <Button className="Login-with-google" href="/auth/google" block>
        {isSignUp ? 'Register With Google' : 'Login With Google'}
      </Button>
    </Form>
  );
};
